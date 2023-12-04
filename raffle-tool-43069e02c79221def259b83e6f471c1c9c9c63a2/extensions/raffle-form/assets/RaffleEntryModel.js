import mongoose from "mongoose";

const RaffleEntriesSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  raffleId: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  updateCount: {
    type: Number,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
});

const RaffleEntry = mongoose.model("Raffle_Entries", RaffleEntriesSchema);
export default RaffleEntry;
