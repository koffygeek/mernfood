import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// router for user registration
router.post("/register", async (request, response) => {
  try {
    const { email, password } = request.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    response.status(201).json({ token, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).send("Server error");
  }
});


// route for user login
router.post("/login", async (request, response) => {
  try {

    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if
} catch (error) {
  console.error(error);
  response.status(500).send("Server error");
}
})
)
