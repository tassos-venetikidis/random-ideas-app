const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db.js");
const ideasRouter = require("./routes/ideas.js");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/ideas", ideasRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Random Idea App");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
