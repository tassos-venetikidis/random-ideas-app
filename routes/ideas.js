const express = require("express");
const router = express.Router();

// Get All Ideas
router.get("/", (req, res) => {});
// Get single idea
router.get("/:id", (req, res) => {
  const id = req.params.id;
});
// Create New Idea
router.post("/", (req, res) => {
  const { text, tag, username } = req.body;
  const idea = {
    text,
    tag,
    username,
    date: new Date().toISOString().slice(0, 10),
  };
});

module.exports = router;
