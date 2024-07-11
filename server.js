const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Set up the proxy
app.use("/api", createProxyMiddleware({
  target: "http://server-nodejs.cit.byui.edu:3000",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
}));

// For any other routes, serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});