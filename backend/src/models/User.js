import mongoose from "mongoose";

import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);


//hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = bcrypt.getSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
export default User;
