const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.PORT;

const connectDb = require("./config/db");
connectDb();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

module.exports = app;
