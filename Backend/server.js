const app = require("./app");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
