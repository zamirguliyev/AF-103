const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const router = require("./routers");

app.use("/api/users", router.user);
app.use("/api/publishers", router.publisher);
app.use("/api/subscriptions", router.subscription);
app.use("/api/news", router.news);
app.use("/api/tags", router.tag);

// PORT 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

require("./config/db");
