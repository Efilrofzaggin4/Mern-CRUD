import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'


function App() {

  const [foodName, setFoodName] = useState("")
  const [age, setAge] = useState(0)

  const [foodList, setFoodList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data)
    });
  }, []);

  const addToDatabase = () => {
    Axios.post("http://localhost:3001/insert", 
    {foodName: foodName, age: age}
    )
  }

  return (
    <div className="App">
      <h1>CRUD APP WITH MERN</h1>

      <label>Food Name</label>
      <input 
        type='text' 
        onChange={(event) => {
          setFoodName(event.target.value)
        }
      }/>

      <label>Food Age</label>
      <input
       type='number' 
        onChange={(event) => {
          setAge(event.target.value)
      }}/>


      <button onClick={addToDatabase}>Add to database</button>

      <h1>Food List</h1>

      {foodList.map((val, key) => {
        return( 
            <div key={key}>
              {""}
              <h1>{val.foodName}</h1> <h1>{val.age}</h1>
            </div>)
      })}
    </div>
  );
}

export default App;
