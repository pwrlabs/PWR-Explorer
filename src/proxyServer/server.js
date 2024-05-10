const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001; // You can choose a different port

// Apply CORS for all incoming requests
app.use(cors());

// Proxy configuration
const apiProxy = createProxyMiddleware({
    target: 'https://api.beehiiv.com', // Target host
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Rewrite paths
    },
    headers: {
        'Authorization': `Bearer FrbPlzl1w97GNA0WOkuNIx2UpodNT052NXExjaJ9ytPvWXWLbXvB09B9ZNNUE4Hd` // Use environment variable for API key
    }
});

// Use the proxy for API routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use('/api', apiProxy);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});