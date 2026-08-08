const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "Bazaarino",
    server: "online"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    app: "Bazaarino",
    status: "online",
    message: "Bazaarino API is working"
  });
});

app.listen(PORT, () => {
  console.log(`Bazaarino server running on port ${PORT}`);
});
