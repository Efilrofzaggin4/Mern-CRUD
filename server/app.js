require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 3001;


const Food = require('./models/foodModel');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/insert', async (req, res) => {
  try {
    const foodName = req.body.foodName;
    const age = req.body.age
    const newFood = await Food.create({ foodName, age });
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/read', async (req, res) => {
    try {
      const result = await Food.find({});
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.put('/update', async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, { foodName: newFoodName }, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/delete/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});