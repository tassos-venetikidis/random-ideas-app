const express = require("express");
const router = express.Router();

// Get All Ideas
router.get("/", (req, res) => {});
// Get single idea
router.get("/:id", (req, res) => {
  const id = req.params.id;
});

module.exports = router;
