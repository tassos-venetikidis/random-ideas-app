const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea.js");

// Get All Ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get single idea
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const idea = await Idea.findById(id);
    res.json({ success: true, data: idea });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Create New Idea
router.post("/", async (req, res) => {
  const { text, tag, username } = req.body;
  const idea = new Idea({
    text,
    tag,
    username,
  });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update Idea
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { text, tag } = req.body;
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        $set: {
          text,
          tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete Idea
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Idea.findByIdAndDelete(id);
    res.json({ success: true, data: {} });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
