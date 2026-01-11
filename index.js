const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();

// 1. Import User Model
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Middleware (To parse JSON data)
app.use(express.json());
app.use(cors()); // Allow Frontend to talk to Backend

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- ROUTES ---

// 2. REGISTER ROUTE (Create New User)
// Using 'post' method because we need to save data        
// --- Updated Register Route ---
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // 2. Hash (Encrypt) the password
        // '10' represents salt rounds (computational cost/strength)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create new user in Database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword // <-- Storing hashed password, not the plain text one
        });

        // 4. Send success response
        res.status(201).json({
            message: "User Registered Successfully!",
            user: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- UPDATED LOGIN ROUTE WITH JWT ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user provided email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // 2. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // --- NEW PART: Generate Token ---
        const token = jwt.sign(
            { id: user._id },           
            process.env.JWT_SECRET,     
            { expiresIn: '1h' }         
        );

        // 4. Send response with Token
        res.status(200).json({
            message: "Login Successful!",
            token: token,               
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
  try {
    
    const users = await User.find(); 
    
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get('/', (req, res) => {
  res.send('Server is Running...');
});

// --- MIDDLEWARE (The Security Guard) ---
// This function checks if the user has a valid Token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token'); // Get token from the header
    
    // Check if token is missing
    if (!token) return res.status(401).json({ message: "Access Denied (No Token)" });

    try {
        // Verify if the token is valid using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user ID to the request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// --- PROTECTED ROUTE (The VIP Room) ---
// Note: 'verifyToken' is used here to protect this route
app.get('/api/dashboard', verifyToken, (req, res) => {
    res.json({ 
        message: "Welcome to the VIP Section! 🥂",
        user: req.user // This data comes from the verified token
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});