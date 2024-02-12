const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express()

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arunsiva@2003",
    database: "Student_database",
})


app.get('/students', (req,res)=>{
    const q = 'select * from Students';
    db.query(q,(err,data)=>{
        res.json(data);
    })
})

app.get('/students/:id',(req,res)=>{
    const val = req.params.id;
    let filt = "";
    if(val==1) filt="leetcode_rank";
    else if(val==2) filt="codechef_rank";
    else filt="codeforces_rank"; 
    console.log(val,filt);
    let q;
    if(val==1) {
         q = 'select * from Students order by leetcode_rank desc';}
    else if(val==2){
         q = 'select * from Students order by codeforces_rank desc';}
    else{
         q = 'select * from Students order by codechef_rank desc';}
    db.query(q,(err,data)=>{
        console.log(data);
        res.json(data);
    })
})


app.post('/students',(req,res)=>{
    const {name, roll_no, department, curr_year, cgpa, mobile_no, place, leetcode_count, leetcode_rank, codechef_rank,codeforces_rank, type_of_training} = req.body;
    const q = `insert into Students (name, roll_no, department, curr_year, cgpa, mobile_no, place, leetcode_count, leetcode_rank, codechef_rank,codeforces_rank, type_of_training) values( ? , ? , ? , ?, ? , ? , ? , ?,? , ? , ? , ?)`;
    db.query(q,[name, roll_no, department, curr_year, cgpa, mobile_no, place, leetcode_count, leetcode_rank, codechef_rank,codeforces_rank, type_of_training],(err,data)=>{
        if(err) console.log(err);
        else{
            res.send("added");
        }
    })
})


app.put('/students/:id',(req,res)=>{
    const id= req.params.id;
    console.log(id);
    const {name, roll_no, department, curr_year, cgpa, mobile_no, place, leetcode_count, leetcode_rank, codechef_rank,codeforces_rank, type_of_training} = req.body;
    // console.log(data);
    const q = `update Students set name=?, roll_no=?, department=?, curr_year=?, cgpa=?, mobile_no=?, place=?, leetcode_count=?, leetcode_rank=?, codechef_rank=?,codeforces_rank=?, type_of_training=? where id=?`;
    db.query(q,[name, roll_no, department, curr_year, cgpa, mobile_no, place, leetcode_count, leetcode_rank, codechef_rank,codeforces_rank, type_of_training, id],(err,result)=>{
       console.log(err);
        res.json("updated");
    })

})

app.delete('/students/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const q = 'delete from Students where id=?';
    db.query(q,id,(err,result)=>{
    console.log(err);
        console.log(result.affectedRows," rows deleted")
        res.json(result);
    })
})


app.listen(5000,()=>console.log("Server connected"));