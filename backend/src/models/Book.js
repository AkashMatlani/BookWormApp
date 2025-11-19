import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
    },
    caption: {
      type: string,
      required: true,
    },
    image: {
      type: string,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reauired: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
