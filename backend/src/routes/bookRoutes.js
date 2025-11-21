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
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const skip = (page - 1) * limit;
    const books = await Book.find()
      .sort({ createdAt: -1 }) //des
      .skip(skip)
      .limit(limit)
      .populate("user", "userName profileImage");

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in fetching books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(400).json({ message: "Book Not Found" });

    //check if user is creater of book
    if (book.user.toString() !== req.user._id.toString())
      return res.status(400).json({ message: "UnAuthorized" });

    //delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error in deleteing image", error);
      }
    }
    await book.deleteOne();
    res.json({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteing book", error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
});

//recommended books

router.get("/user", protectRoute, async (req, res) => {
  try {
    const books= await Book.find({user:req.user._id}).sort({createdAt:-1});
    res.json(books);
  } catch (error) {
    console.error("Error in Fetching Recommended Books");
    res.status(500).json({message:"Internal Server Error"});
  }
});

export default router;
