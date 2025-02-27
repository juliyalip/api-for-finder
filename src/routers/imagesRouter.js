const express = require('express')
require('dotenv').config();
const axios = require('axios');

const { KEY, BASE_URL } = process.env

const imageRouter = express.Router();

imageRouter.get('/proxy', async (req, res, next) => {
    try {
        const { searchQuery, page = 1, limit = 8 } = req.query;

        if (!searchQuery) {
            return res.status(400).json({ error: 'seachQuery param is required' });
        }
        const url = `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=${limit}&key=${KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        next(error)
    }
})


module.exports = imageRouter;