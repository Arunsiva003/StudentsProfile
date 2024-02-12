import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Form from "./Form";
import Table from './Table';
import Temper from './Tempor';
import axios from 'axios';
function App() {
  const url =  "http://localhost:5000/";
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = () => {
    axios
      .get(`${url}students`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
      console.log("data",data)
  };
  // fetchData();
  return (
      <Router>
        <div className='App'>
          <div style={{display:'flex', justifyContent:'center'}}>
          <h1 >Students' Profile</h1>
          </div>
              <Routes>
                <Route path='/edit/:id' element={<Form data={data} setData={setData} />} />
                <Route path='/table' element={<Table/>}/>
                <Route path='/' element={<Form data={data} setData={setData} />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;


