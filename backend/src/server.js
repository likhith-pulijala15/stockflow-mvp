require("dotenv").config();
const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "StockFlow API Running",
  });
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
