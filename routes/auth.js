import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import verifyToken from "../middleware/verifyToken.js";
import Post from "../models/Post.js";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Check if all fields are provided

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router create post
router.post("/create-post", verifyToken, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Cek apakah user ada di database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;

    // **🔹 Cek jumlah post yang sudah dibuat user ini**
    const postCount = await Post.countDocuments({ userEmail });
    if (postCount >= 3) {
      return res
        .status(403)
        .json({ message: "Post limit reached (3 posts max)" });
    }

    // Jika belum mencapai limit, buat post baru
    const newPost = new Post({
      title,
      description,
      image,
      userEmail,
    });

    await newPost.save();
    console.log("Post berhasil dibuat");

    res
      .status(201)
      .json({ message: "Post successfully created", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/posts", verifyToken, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    console.log("UserId is missing");
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userEmail = user.email;
  try {
    // Ambil semua post dan populasi data user
    const posts = await Post.find({ userEmail });

    // Jika tidak ada post, beri respons yang sesuai
    if (posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    // Kirim data post
    res.status(200).json(posts);
  } catch (error) {
    console.log("Get posts error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
