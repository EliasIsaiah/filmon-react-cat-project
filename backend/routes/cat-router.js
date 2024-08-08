const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const catSchema = require("../models/Cat");

const Cat = mongoose.model("Cat", catSchema);

router.post("/cat", async (req, res) => {
  const { image, name, color, age } = req.body;
  const cat = new Cat({
    image,
    name,
    color,
    age,
  });

  await cat.save();

  res.status(201).json({ createdCat: cat });
});

// get cat by id
router.get("/cat/:id", async (req, res) => {
  const cat = await Cat.findById(req.params.id);
  res.status(200).json({ cat });
});

router.get("/cats", async (req, res) => {
  const cats = await Cat.find({ ...req.body });
  res.status(200).json({ cats });
});

router.put("/cat/:id", async (req, res) => {
  const { name, color, age } = req.body;
  const cat = await Cat.findByIdAndUpdate(
    req.params.id,
    { name, color, age },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(200).json(cat);
});

// Update user by ID
// app.put("/users/:id", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { username, hashedPassword },
//       { new: true, runValidators: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating user", error });
//   }
// });

router.delete("/cat/:id", async (req, res) => {
  const id = req.params.id;
  let statusCode = 200;
  let messageObject = { message: "successfully deleted cat!" };

  try {
    const deletedCat = await Cat.findByIdAndDelete(id);
    if (!deletedCat) {
      statusCode = 400;
      messageObject = { message: "could not find cat to delete!" };
    }
  } catch (e) {
    if (e.kind === "ObjectId") {
      statusCode = 400;
      messageObject = {
        message:
          "there was a problem with the ObjectId format. Please ensure that you've entered a valid ObjectId",
        reason: e.reason.message,
      };
    } else {
      statusCode = 500;
    }
  }
  return res.status(statusCode).json({ messageObject });
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "good job" });
});

module.exports = router;
