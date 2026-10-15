const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    date: { type: Date, required: true, default: Date.now },
    recordedBy: { type: String, trim: true, default: "Treasurer" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
