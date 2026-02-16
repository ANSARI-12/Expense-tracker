const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    amount: Number,
    category: String,
    date: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;
