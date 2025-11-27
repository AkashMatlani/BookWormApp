import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const genrateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
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
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register route", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fileds are required" });
    }

    //if user Exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //compare password
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    //genrate token
    const token = genrateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in Login route", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
