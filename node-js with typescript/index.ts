import { product_router } from "./routers/product.router";

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const router = require("./routers");

app.use("/api/products", product_router);

// PORT 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
  
  require("./config/db");