import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form({ editMode, studentData, fetchData }) {
    const navigate = useNavigate();
    const url = "https://studentsprofile.onrender.com/";
//   useEffect(() => {
//     fetchData();
//   }, []);
  
  const [student, setStudent] = useState({
    name: '',
    roll_no: '',
    department: '',
    curr_year: null,
    cgpa: null,
    mobile_no: '',
    place: '',
    leetcode_count: null,
    leetcode_rank: null,
    codechef_rank: null,
    codeforces_rank: null,
    type_of_training: null,
});

useEffect(() => {
    if (editMode && studentData) {
        setStudent(studentData);
    }
}, [editMode, studentData]);
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

//   const fetchData = () => {
//     axios
//       .get(`${url}students`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err));
//       console.log("data",data)
//   };

  const addstudent = (e) => {
    
    e.preventDefault();
    if(student.name.length==0){
      alert("Name can't be empty");
      return;
    }
    if(student.curr_year<1 || student.curr_year>4){
      alert("enter correct year of study");
      return;
    }
    if(student.cgpa<1 || student.cgpa>10){
      alert("Enter a valid cgpa");
      return;
    }
    if(student.mobile_no.length<10){
      alert("invalid mobile number");
      return;
    }
    if (editing) {
      axios
        .put(`${url}students/${editingId}`, student)
        .then(() => fetchData())
        .catch((err) => console.log(err))
        .finally(() => {
          setEditing(false);
          setEditingId(null);
          clearForm();
        });
    } else {
      console.log("posting started");
      axios
        .post(`${url}students`, student)
        .then(() => {
          console.log("posted");
          fetchData()
        }
        )
        .catch((err) => console.log("error occured",err))
        .finally(clearForm);
    }
  };
  

  const editStudent = (id) => {
    console.log("id to edit: ",id);
    const studentToEdit = data.find((student) => student.id === id);
    
    if (studentToEdit) {
      setStudent({ ...studentToEdit, id: id }); 
      setEditing(true);
      setEditingId(id);
    } else {
      console.error(`student with id ${id} not found.`);
    }
  };

  const deleteStudent = (id) => {
    console.log(id);
    axios
      .delete(`${url}students/${id}`)
      .then(console.log(typeof id))
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const clearForm = () => {
    setStudent({
        name:'',
        roll_no:'',
        department:'',
        curr_year:'',
        cgpa:'',
        mobile_no:'',
        place:'',
        leetcode_count:'',
        leetcode_rank :'',
        codechef_rank: '',
        codeforces_rank : '',
        type_of_training : ''
    });
  };

  const handleFilteredFetch = (filter) =>{
    const val = filter;
    console.log(val);
    let filt;
    if(val=="leet") filt=1;
    else if(val=="force") filt=2;
    else filt=3;
    console.log(filt);
    axios
      .get(`${url}students/${filt}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
      console.log("data",data)

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:"center",margin:'20px'}}>
      <form className="form-container" onSubmit={addstudent}>
  <div className="form-column">
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
      />
    </label>
    <label>
      Roll No:
      <input
        type="text"
        name="roll_no"
        value={student.roll_no}
        onChange={handleChange}
      />
    </label>
    <label>
      Department:
      <input
        type="text"
        name="department"
        value={student.department}
        onChange={handleChange}
      />
    </label>
    <label>
      Current Year:
      <input
        type="number"
        name="curr_year"
        value={student.curr_year}
        onChange={handleChange}
      />
    </label>
    <label>
      CGPA:
      <input
        type="number"
        name="cgpa"
        value={student.cgpa}
        onChange={handleChange}
      />
    </label>
  </div>
  <div className="form-column">
    <label>
      Mobile No:
      <input
        type="text"
        name="mobile_no"
        value={student.mobile_no}
        onChange={handleChange}
      />
    </label>
    <label>
      Place:
      <input
        type="text"
        name="place"
        value={student.place}
        onChange={handleChange}
      />
    </label>
    <label>
      LeetCode Count:
      <input
        type="number"
        name="leetcode_count"
        value={student.leetcode_count}
        onChange={handleChange}
      />
    </label>
    <label>
      LeetCode Rank:
      <input
        type="number"
        name="leetcode_rank"
        value={student.leetcode_rank}
        onChange={handleChange}
      />
    </label>
    <label>
      CodeChef Rank:
      <input
        type="number"
        name="codechef_rank"
        value={student.codechef_rank}
        onChange={handleChange}
      />
    </label>
    <label>
      CodeForces Rank:
      <input
        type="number"
        name="codeforces_rank"
        value={student.codeforces_rank}
        onChange={handleChange}
      />
    </label>
    <label>
      Type of Training:
      <input
        type="number"
        name="type_of_training"
        value={student.type_of_training}
        onChange={handleChange}
      />
      <p>1-SDE<br />2-FULLSTACK<br />3-GENERAL</p>
    </label>
  </div>
  <button type="submit">{editMode ? "Update" : "Submit"}</button>
                <button type="button" onClick={clearForm}>Clear</button>
            </form>
            <button onClick={() => navigate('/table')}>View Details</button>
        </div>
    );
};

export default Form;

{/* <button class="updateButton" onClick={() => editUser(item.EmployeeId)}>Edit</button>
<button class="deleteButton" onClick={() => deleteUser(item.EmployeeId)}>Delete</button>
</td> */}