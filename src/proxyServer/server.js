const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const apiProxy = createProxyMiddleware({
    target: 'https://api.beehiiv.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    headers: {
        'Authorization': `Bearer FrbPlzl1w97GNA0WOkuNIx2UpodNT052NXExjaJ9ytPvWXWLbXvB09B9ZNNUE4Hd`
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Proxy response:', proxyRes.statusCode);
    },
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api', apiProxy);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});