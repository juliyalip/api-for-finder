const express = require('express')
require('dotenv').config();
const axios = require('axios');

const { KEY, BASE_URL } = process.env

const imageRouter = express.Router();

imageRouter.get('/proxy', async (req, res, next) => {
    try {
        const { searchQuery, page = 1, limit = 8 } = req.query;

        if (!searchQuery) {
            return res.status(400).json({ error: 'searchQuery param is required' });
        }

        const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=${limit}`)

        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = imageRouter;