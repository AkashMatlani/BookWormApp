import express from "express";

import cloudinary from "../lib/cloudinary";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!image || !title || !caption || !rating) {
      return res.status(400).json({ message: "Please provide all fileds" });
    }

    //upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    //save to the database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in creating books", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    console.log("Error in fetching books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
