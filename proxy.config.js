const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: "http://localhost:50007/",
        secure: false,
        "changeOrigin": true
    }
]
module.exports = PROXY_CONFIG;