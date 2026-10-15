const express = require("express");
const Contribution = require("../models/Contribution");

const router = express.Router();

// GET /api/contributions?search=ana
router.get("/", async (req, res, next) => {
  try {
    const search = String(req.query.search || "").trim();
    const filter = {};

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matchingStudents = await require("../models/Student").find({
        $or: [
          { name: { $regex: escaped, $options: "i" } },
          { studentId: { $regex: escaped, $options: "i" } }
        ]
      }).select("_id");

      filter.$or = [
        { description: { $regex: escaped, $options: "i" } },
        { studentId: { $in: matchingStudents.map((student) => student._id) } }
      ];
    }

    const contributions = await Contribution.find(filter)
      .populate("studentId", "studentId name section")
      .sort({ date: -1 });

    res.json({ count: contributions.length, data: contributions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
