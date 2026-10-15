const express = require("express");
const Contribution = require("../models/Contribution");
const Expense = require("../models/Expense");

const router = express.Router();

// GET /api/transactions?type=expense
// type may be "contribution", "expense", or omitted for both.
router.get("/", async (req, res, next) => {
  try {
    const type = String(req.query.type || "").toLowerCase();
    if (type && !["contribution", "expense"].includes(type)) {
      return res.status(400).json({
        message: 'type must be "contribution" or "expense"'
      });
    }

    const [contributions, expenses] = await Promise.all([
      type === "expense"
        ? Promise.resolve([])
        : Contribution.find()
            .populate("studentId", "studentId name section")
            .lean(),
      type === "contribution"
        ? Promise.resolve([])
        : Expense.find().lean()
    ]);

    const transactions = [
      ...contributions.map((item) => ({
        ...item,
        type: "contribution",
        amount: Number(item.amount)
      })),
      ...expenses.map((item) => ({
        ...item,
        type: "expense",
        amount: Number(item.amount)
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ count: transactions.length, data: transactions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
