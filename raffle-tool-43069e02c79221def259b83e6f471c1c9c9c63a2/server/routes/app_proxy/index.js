import { Router } from 'express';
import mongoose from 'mongoose';
import RafflePost from '../../../extensions/raffle-form/assets/RafflePostModel.js';
import RaffleEntry from '../../../extensions/raffle-form/assets/RaffleEntryModel.js';



const proxyRouter = Router();

proxyRouter.get('/json', (req, res) => {
  const jsonObject = { content: 'proxyiej working' };
  res.send(jsonObject);
});


proxyRouter.post('/raffle_entry', async (req, res) => {
  if (req.method !== 'POST' || !req.is('application/json')) {
    return res.status(401).json({ message: 'Invalid POST request or no JSON body' });
  }
  const raffleData = req.body;

  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const existingRaffleEntry = await RaffleEntry.findOne({ customerId: raffleData.customerId, raffleId: raffleData.raffleId });

    if (existingRaffleEntry) {
      console.log('existingRaffleEntry found');
      existingRaffleEntry.set(raffleData);
      // existingRaffleEntry.updateCount += 1;
      await existingRaffleEntry.save();
      return res.status(200).json({ message: 'Updated your raffle request' });
    } else {
      const newRaffleEntry = new RaffleEntry(raffleData);
      await newRaffleEntry.save();
      console.log('RaffleEntry saved');

      const existingRafflePost = await RafflePost.findOne({ raffleId: raffleData.raffleId });
      if (existingRafflePost) {
        await RafflePost.updateOne({ raffleId: raffleData.raffleId, articleId: raffleData.raffleId, productId: raffleData.productId, productTitle: raffleData.productTitle }, { $inc: { updateCount: 0 } });
        console.log('RafflePost found');
      } else {
        await RafflePost.create({ raffleId: raffleData.raffleId, articleId: raffleData.raffleId, productId: raffleData.productId, productTitle: raffleData.productTitle, updateCount: 1 });
        console.log('RafflePost created');
      }
      return res.status(200).json({ message: 'Added to raffle form' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(401).json({ message: 'Problem with adding your raffle details', error });
  } finally {
    // mongoose.disconnect();
    // console.log('Disconnected from the database');
  }
});

export default proxyRouter;