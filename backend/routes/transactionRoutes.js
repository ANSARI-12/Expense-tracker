const router = require("express").Router();
const Transaction = require("../models/TransactionModel");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(transaction);
});

router.get("/", auth, async (req, res) => {
  const { search, category } = req.query;
  let query = { userId: req.user.id };
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = category;

  const data = await Transaction.find(query).sort({
    date: -1,
  });
  res.json(data);
});

router.put("/:id", auth, async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json(tx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted Successfully" });
});

module.exports = router;
