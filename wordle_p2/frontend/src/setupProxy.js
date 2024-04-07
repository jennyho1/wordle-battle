const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8550',
            changeOrigin: true,
        })
    );
		app.use('/ws', createProxyMiddleware({ target: 'ws://localhost:8552', ws: true }));
};



// // Forwards HTTP requests to your frontend running on port 8551
// app.use('/', createProxyMiddleware({ target: 'http://localhost:8551', ws: true }));

// // Forwards WebSocket requests to your WebSocket server running on port 8552
// app.use('/ws', createProxyMiddleware({ target: 'ws://localhost:8552', ws: true }));
