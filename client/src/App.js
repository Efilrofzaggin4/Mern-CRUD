import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState("");
  const [age, setAge] = useState(0);
  const [newFoodName, setNewFoodName]  = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetchFoodList();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/read");
      setFoodList(response.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const addToDatabase = async () => {
    try {
      await Axios.post("http://localhost:3001/insert", {
        foodName: foodName,
        age: age
      });
      fetchFoodList();
    } catch (error) {
      console.error("Error adding food to database:", error);
    }
  };

  const updateFood = async (id) => {
    try {
      await Axios.put("http://localhost:3001/update", {
        id: id,
        newFoodName: newFoodName
      });
      fetchFoodList();
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  const deleteFood = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`);
      fetchFoodList(); 
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="App">
      <h1>CRUD APP WITH MERN</h1>

      <label>Food Name</label>
      <input 
        type='text' 
        onChange={(event) => setFoodName(event.target.value)}
      />

      <label>Food Age</label>
      <input
        type='number' 
        onChange={(event) => setAge(event.target.value)}
      />

      <button onClick={addToDatabase}>Add to database</button>

      <h1>Food List</h1>

      {foodList.map((val, key) => (
        <div key={key} className='food'>
          <h1>{val.foodName}</h1> <h1>{val.age}</h1>
          <input 
            type='text' 
            placeholder='New food name' 
            onChange={(event) => setNewFoodName(event.target.value)}
          />
          <button onClick={() => updateFood(val._id)}>Update</button>
          <button onClick={() => deleteFood(val._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
