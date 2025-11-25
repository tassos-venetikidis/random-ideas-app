const express = require("express");
const ideasRouter = require("./routes/ideas.js");
const port = 5000;

const app = express();

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
