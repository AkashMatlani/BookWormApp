import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const genrateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
  };

  try {
    if (!userName || !password || !email) {
      return res.status(400).json({ message: "All Fileds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Should be at least 6 Characters long" });
    }

    if (userName.length < 3) {
      return res
        .status(400)
        .json({ message: "UserName Should be at least 3 Characters long" });
    }

    //check email is exist

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email alreday exists" });
    }

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username alreday exists" });
    }

    //get random profileiamge

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

    const user = new User({ email, userName, password, profileImage });

    await user.save();

    const token = genrateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register route", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/login", async (req, res) => {
  res.send("login");
});

export default router;
