import mongoose from "mongoose";

let RafflePost;
try {
  RafflePost = mongoose.model("Raffle_Posts");
} catch (error) {
  const RafflePostSchema = new mongoose.Schema({
    raffleId: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
    },
    articleId: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    productTitle: {
      type: String,
    },
    updateCount: {
      type: Number,
    },
  });

  RafflePost = mongoose.model("Raffle_Posts", RafflePostSchema);
}

export default RafflePost;
