const express = require('express');
const cors = require('cors');
require('dotenv').config();
const imageRouter = require("./routers/imagesRouter")

const {BASE_URL} = process.env

const app = express();
app.use(express.json())

app.use(cors({
      origin: 'https://juliyalip.github.io/image-finder-in/index.js',
    credentials: true,
  }))

  const PORT = BASE_URL || 4400;

  app.use('/', imageRouter);
  
  app.use((req, res) => {
      res.status(404).json({ message: "Page is not found" })
    })
    
    app.use((error, req, res, next) => {
      const { status = 500, message = "Server error" } = error;
      res.status(status).json({ message })
    })
  
  app.listen(PORT, () => {
    console.log(`🚀 Proxy server running`);
  });