const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors())
const mongoose = require('mongoose');


const MealSchema = new mongoose.Schema({
    title: String,
    price: Number,
    desc: String,
    category: String
})

const MealModel = mongoose.model('Meal', MealSchema)


app.get('/api/meals', async (req, res) => {
    const { title } = req.query;
    const meal = await MealModel.find({});
    if (title) {
        const filteredUsers = meal.filter((x) => x.title.toLowerCase().trim().includes(title.toLowerCase().trim()));
        res.send(filteredUsers);
    }
    else {
        res.send(meal);
    }
});

app.get('/api/meals/:id', async (req, res) => {
    const { id } = req.params;
    const meal = await MealModel.findById(id);
    if (meal) {
        res.status(200).send(meal)
    }
    else {
        res.send({ message: 'not found' })
    }
})

app.post('/api/meals', async (req, res) => {
    const newMeal = new MealModel(req.body);
    await newMeal.save();
    res.send(newMeal);
})

app.patch('/api/meals/:id', async (req, res) => {
    const { id } = req.params;
    await MealModel.findByIdAndUpdate(id, req.body);
    const updatedMeal = await MealModel.findById(id);
    res.send(updatedMeal);
})

app.delete('/api/meals/:id', async (req, res) => {
    const { id } = req.params
    await MealModel.findByIdAndDelete(id);
    const meal = await MealModel.find();
    res.send(meal)
})



app.listen(3000, () => { console.log("Server running on port 3000") });

mongoose.connect(
    ""
)
    .then(() => console.log("Connected to MongoDB!"));