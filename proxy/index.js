const dotenv = require('dotenv');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config({path: './config/.env.local'});

// Configuration
const REPLICATE_TOKEN = process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_API_TOKEN;
const appendAuthHeaders = (proxyReq) => {
    proxyReq.setHeader('Authorization', `Token ${REPLICATE_TOKEN}`);
};
const onProxyRes = (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
    delete proxyRes.headers['content-type'];
};
const app = express();
app.use('/api/', createProxyMiddleware({
    router: (req) => req.originalUrl.replace(/.*https?:\/\//, 'https://'),
    changeOrigin: true,
    pathRewrite: { '.*': '' },
    onProxyReq: appendAuthHeaders,
    onProxyRes: onProxyRes
}));
app.listen(3000, () => {
    console.log('Proxy Started');
    if (process.send) {
        process.send("ready");
    }
});