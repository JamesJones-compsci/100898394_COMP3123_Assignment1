const express = require('express'); 
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// POST /api/users/signup
// Register new user
// Public access

router.post('/signup', async(req, res) =>{
    const { username, email, password } = req.body;

    try {
        // Check to see if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: 'A User with this email already exists'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;