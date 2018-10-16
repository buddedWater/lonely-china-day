export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:3000/",
      //"target": "http://60.205.231.78:3000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
