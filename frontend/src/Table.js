// import { useEffect } from "react";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Table () {
    const url = "https://studentsprofile.onrender.com/";
    const navigate = useNavigate();

    useEffect(() => {
      fetchData();
    }, []);
  
    const [student, setStudent] = useState({
      name:'',
      roll_no:'',
      department:'',
      curr_year:null,
      cgpa:null,
      mobile_no:'',
      place:'',
      leetcode_count:null,
      leetcode_rank :null,
      codechef_rank: null,
      codeforces_rank : null,
      type_of_training : null,
    });
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchData = () => {
      axios
        .get(`${url}students`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
        console.log("data",data)
    };

  const editStudent = (id) => {
    alert("edit?")
    navigate('/edit/'+id);
  };

  const deleteStudent = (id) => {
    console.log(id);
    axios
      .delete(`${url}students/${id}`)
      .then(console.log(typeof id))
      .then(() => fetchData())
      .catch((err) => console.log(err));
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

    return (
        <>     
        {data.length > 0 ? (
        
            <table border={1}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll_no</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>CGPA</th>
                  <th>Mobile No.</th>
                  <th>Place</th>
                  <th>Leetcode Rank</th>
                  <th>Codeforces Rank</th>
                  <th>Codechef Rank</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.roll_no}</td>
                    <td>{item.department}</td>
                    <td>{item.curr_year}</td>
                    <td>{item.cgpa}</td>
                    <td>{item.mobile_no}</td>
                    <td>{item.place}</td>
                    <td>{item.leetcode_rank}</td>
                    <td>{item.codeforces_rank}</td>
                    <td>{item.codechef_rank}</td>
                    <td>
                      <button class="updateButton" onClick={() =>{
                        editStudent(item.id);
                    }}>Edit</button>
                      <button class="deleteButton" onClick={() => deleteStudent(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>  
            ) : (
            <p>No data</p>
          )}
    
              {
                data.length>0 && <div>
                  Sort by: 
                  <button onClick={()=>handleFilteredFetch("leet")}>Leetcode</button>
                  <button onClick={()=>handleFilteredFetch("chef")}>CodeChef</button>
                  <button onClick={()=>handleFilteredFetch("force")}>Codeforces</button>
    
                </div>
              }
      </>
    )    
}

export default Table;