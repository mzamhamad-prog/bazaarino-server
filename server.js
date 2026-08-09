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

app.get("/search", (req, res) => {
  const query = (req.query.q || "").trim();

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "نام کالا را وارد کنید",
      total: 0,
      products: []
    });
  }

  const products = [
    {
      title: `نتیجه آزمایشی برای ${query}`,
      price: 100
    }
  ];

  res.json({
    success: true,
    query: query,
    total: products.length,
    products: products
  });
});

app.listen(PORT, () => {
  console.log(`Bazaarino server running on port ${PORT}`);
});
