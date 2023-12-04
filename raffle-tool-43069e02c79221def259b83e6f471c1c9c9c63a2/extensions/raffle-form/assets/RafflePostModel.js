import mongoose from "mongoose";

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

const RafflePost = mongoose.model("Raffle_Posts", RafflePostSchema);
export default RafflePost;
