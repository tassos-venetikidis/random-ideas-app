const express = require("express");
const ideasRouter = require("./routes/ideas.js");
const port = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Random Idea App");
});

app.use("/api/ideas", ideasRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
