require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/Student");
const Contribution = require("./models/Contribution");
const Expense = require("./models/Expense");

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("Set MONGODB_URI in .env first.");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  let students = await Student.find().sort({ createdAt: 1 });
  if (students.length === 0) {
    students = await Student.insertMany([
      { studentId: "2026-001", name: "Ana Santos", section: "BSIT 1-A", status: "active" },
      { studentId: "2026-002", name: "Mark Reyes", section: "BSIT 1-A", status: "active" },
      { studentId: "2026-003", name: "Jamie Cruz", section: "BSIT 1-A", status: "active" },
      { studentId: "2026-004", name: "Alex Garcia", section: "BSIT 1-A", status: "active" },
      { studentId: "2026-005", name: "Sam Dela Rosa", section: "BSIT 1-A", status: "active" }
    ]);
    console.log("Inserted 5 sample students");
  } else console.log(`Keeping existing students (${students.length} found)`);

  if (await Contribution.countDocuments() === 0) {
    const ids = new Map(students.map(s => [s.studentId, s._id]));
    const data = [
      ["2026-001", 500, "2026-10-10"],
      ["2026-002", 500, "2026-10-10"],
      ["2026-003", 300, "2026-10-11"],
      ["2026-004", 500, "2026-10-12"],
      ["2026-005", 200, "2026-10-12"]
    ].filter(x => ids.has(x[0])).map(x => ({
      studentId: ids.get(x[0]), amount: x[1], date: new Date(x[2]),
      description: "Class fund contribution"
    }));
    await Contribution.insertMany(data);
    console.log(`Inserted ${data.length} sample contributions`);
  } else console.log("Keeping existing contributions");

  if (await Expense.countDocuments() === 0) {
    await Expense.insertMany([
      { description: "Classroom supplies", category: "School Supplies", amount: 250, date: new Date("2026-10-12"), recordedBy: "Treasurer" },
      { description: "Printing activity sheets", category: "Printing", amount: 150, date: new Date("2026-10-12"), recordedBy: "Treasurer" },
      { description: "Class decoration materials", category: "Materials", amount: 100, date: new Date("2026-10-13"), recordedBy: "Treasurer" }
    ]);
    console.log("Inserted 3 sample expenses");
  } else console.log("Keeping existing expenses");

  console.log("Seed complete. If all collections were empty: contributions ₱2,000; expenses ₱500; balance ₱1,500.");
}
main()
  .catch(err => { console.error("Seed failed:", err.message); process.exitCode = 1; })
  .finally(async () => { await mongoose.disconnect(); });
//test