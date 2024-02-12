import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const url = "https://task-employeee.onrender.com/"
  useEffect(() => {
    fetchData();
  }, []);
  
  const [User, setUser] = useState({
    FirstName: '',
    LastName: '',
    Salary: '',
    DateOfBirth: '',
  });
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchData = () => {
    axios
      .get(`${url}users`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const addUser = (e) => {
    e.preventDefault();
    if (editing) {
      axios
        .put(`${url}users/${editingId}`, User)
        .then(() => fetchData())
        .catch((err) => console.log(err))
        .finally(() => {
          setEditing(false);
          setEditingId(null);
          clearForm();
        });
    } else {
      axios
        .post(`${url}users`, User)
        .then(() => fetchData())
        .catch((err) => console.log("error occured",err))
        .finally(clearForm);
    }
  };
  

  const editUser = (id) => {

    const userToEdit = data.find((user) => user.EmployeeId === id);
    
    if (userToEdit) {
      setUser({ ...userToEdit, employeeId: id }); 
      setEditing(true);
      setEditingId(id);
    } else {
      console.error(`User with EmployeeId ${id} not found.`);
    }
  };

  const deleteUser = (employeeId) => {
    console.log(employeeId);
    axios
      .delete(`${url}users/${employeeId}`)
      .then(console.log(typeof employeeId))
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const clearForm = () => {
    setUser({
      FirstName: '',
      LastName: '',
      Salary: null,
      DateOfBirth: '',
    });
  };


const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    return age - 1;
  }

  return age;
};

const averageSalary = () => {
  let sum=0;
  data.map((item)=>{
    sum+=Number(item.Salary);
  })
  // const totalSalary = data.reduce((sum, user) => sum + user.Salary, 0);
  const average = data.length > 0 ? sum / data.length : 0;
  
  return average.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="App">
      <form onSubmit={addUser}>
        <label htmlFor="firstname">FirstName</label>
        <input
          type="text"
          name="FirstName"
          value={User.FirstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="lastname">LastName</label>
        <input
          type="text"
          name="LastName"
          value={User.LastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="Salary"
          value={User.Salary}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="DateOfBirth"
          value={User.DateOfBirth}
          onChange={handleInputChange}
          required
        />
        <div class="button">
        <button class={editing?"updateButton":"addButton"} type="submit">{editing ? 'Update' : 'Add'}</button>
        </div>
      </form>

      {data.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Salary</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Salary}</td>
                <td>{new Date(item.DateOfBirth).toLocaleDateString()}</td>
                <td>{calculateAge(item.DateOfBirth)>0?calculateAge(item.DateOfBirth):"invalid"}</td>
                <td>
                  <button class="updateButton" onClick={() => editUser(item.EmployeeId)}>Edit</button>
                  <button class="deleteButton" onClick={() => deleteUser(item.EmployeeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>      
        ) : (
        <p>No data</p>
      )}
      {
        data.length>0 ? 
        <div className="average-salary">
        <p>Average Salary: ${averageSalary()}</p>
        </div>
    :""}
    </div>
  );
}

export default App;
