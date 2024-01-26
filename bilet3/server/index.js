const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors())
const mongoose = require('mongoose');

const BiletThreeSchrma = new mongoose.Schema({
    title:String,
    price:Number,
    img:String,
    meals:String,
    ctg:String
})

const BiletThreeModel = mongoose.model("BiletThree",BiletThreeSchrma)

app.get('/api/biletthree',async(req,res)=>{
    const meals = await BiletThreeModel.find({})
    res.send(meals)
})

app.get('/api/biletthree/:id',async(req,res)=>{
    const {id} = req.params
    const meal = await BiletThreeModel.findById(id)
    res.send(meal)
})

app.post('/api/biletthree/',async(req,res)=>{
    const NewMeal = BiletThreeModel(req.body)
    await NewMeal.save()
    res.send(NewMeal)
})

app.delete('/api/biletthree/:id',async(req,res)=>{
    const {id} =req.params
    await BiletThreeModel.findByIdAndDelete(id)
    const meal = await BiletThreeModel.find()
    res.send(meal)
})



app.listen(3000,()=>{console.log("Server runnung 3000 port ")})

mongoose.connect( 
    "" 
    ) 
    .then(() => console.log("Connected to MongoDB!"));