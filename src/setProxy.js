const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', {
    target: 'http:console.tim.qq.com',
        secure: false,
            changeOrigin: true,
        pathRewrite: {
        "^/api": "/"
    },
}));
};
