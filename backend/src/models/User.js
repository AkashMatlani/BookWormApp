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
},
{timestamps: true}
);

//hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare Password func
userSchema.methods.comparePassword = async function (userPassword) {
  //it will return true or false
  return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
