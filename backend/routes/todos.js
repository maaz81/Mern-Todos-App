const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.post("/", async (req, res) => {
    try {
        const { title, desc } = req.body;
        
        // Validate required field
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        // Create a single todo with both fields
        const newTodo = new Todo({ 
            title,
            desc: desc || '', // Set to empty string if not provided
            createdAt: new Date()
        });
        
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ 
            error: "Failed to add todo",
            details: err.message // Include error details
        });
    }
});

module.exports = router;