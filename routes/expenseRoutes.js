const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// GET /api/expenses?search=supplies
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    const search = String(req.query.search || "").trim();

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { description: { $regex: escaped, $options: "i" } },
        { category: { $regex: escaped, $options: "i" } }
      ];
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ count: expenses.length, data: expenses });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
