require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Frontend files serve karne ke liye
app.use(express.static(path.join(__dirname)));

const API_KEY = process.env.API_KEY;

// Story generation endpoint
app.post('/api/generate-story', async (req, res) => {
    const { name, place, fear } = req.body;
    
    if (!API_KEY) {
        return res.status(500).json({ error: "API key is not configured on the backend." });
    }

    try {
        res.json({
            success: true,
            message: `Story generated successfully for ${name} at ${place} with ${fear} fear level.`
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate story." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`GhostHost server running on http://localhost:${PORT}`);
});