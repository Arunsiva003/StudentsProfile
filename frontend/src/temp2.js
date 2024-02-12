import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Form from "./Form"

function App() {

  return (
      <Router>
        <div className='App'>
              <Routes>
                <Route path='/' element={<Form/>} />
              </Routes>
          </div>
      </Router>
  );
}

// Example 404 (Not Found) component
const NotFound = () => {
  const navigate = useNavigate();
  navigate('/');
};

export default App;


