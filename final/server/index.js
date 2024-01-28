const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const port = 3000;

const FinalShema = new mongoose.Schema({
  title: String,
  price: Number,
  img: String,
});

const Final = mongoose.model("FinalsExam", FinalShema);

app.get("/api/final", async (req, res) => {
  const meals = await Final.find({});
  res.send(meals);
});

app.get("/api/final/:id", async (req, res) => {
  const { id } = req.params;
  const meal = await Final.findById(id);
  res.send(meal);
});

app.post("/api/final/", async (req, res) => {
  const NewMeal = Final(req.body);
  await NewMeal.save();
  res.send(NewMeal);
});

app.delete("/api/final/:id", async (req, res) => {
  const { id } = req.params;
  await Final.findByIdAndDelete(id);
  const meal = await Final.find();
  res.send(meal);
});

app.listen(port, () => {
  console.log(`Server runnung ${port} port`);
});

mongoose
  .connect(
    ""
  )
  .then(() => console.log("Connected to MongoDB!"));
