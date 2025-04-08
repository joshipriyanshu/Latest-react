require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/Users");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🔹 Home Route
app.get("/user", async (req, res) => {

  try {
    const user = await User.find({} )
    const userNames = user.map(e => e.email)
    res.send(userNames);
    
  } catch (error) {
    console.log('sorry', error)
  }
  
    
});

// 🔹 User Registration
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
});

// 🔹 Login Authentication
app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // ✅ Check if user exists
      if (!user) {
          return res.status(400).json({ error: "User not found. Please register first." });
      }

      // ✅ Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // ✅ Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, email: user.email });
    
  } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "Login failed" });  
  }
});

// 🔹 Protected Route
app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
});

// 🔹 Middleware to Verify Token
function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
}

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
