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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});