const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo.js')

require('dotenv').config()

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.DATABASE_URL, {
})

const db = mongoose.connection
db.on("error", (err)=> console.log(err.message + " is mongo not running?"))
db.on("connected", ()=> console.log("mongo connected"))
db.on("disconnected", ()=> console.log("mongo DISCONNECTED"))


// MIDDLEWARE
app.use(express.urlencoded({ extended: true}))



//todo I N D U C E S   Index New Delete Update Create Edit Show  

// INDEX
app.get("/todo", (req, res) => {
    Todo.find({}, (error, allTodo)=>{
        res.render("index.ejs", { todo: allTodo})
    })
})


// NEW 
app.get("/todo/new", (req, res) => {
    res.render("new.ejs")
})




// CREATE
app.post("/todo", (req, res) => {
    if(req.body.completed === "on"){
        req.body.completed = true
    } else {
        req.body.completed = false
    }

    Todo.create(req.body, (error, createdTodo) => {
        res.redirect("/todo/");
    })
})


// SHOW

app.get("/todo/:id", (req, res)=> {
    Todo.findById(req.params.id, (err, foundTodo)=> {
        res.render("show.ejs", { todo: foundTodo })
    })
})




app.listen(PORT, ()=> console.log(`You are listening to the smoothe sounds of port ${PORT}...`))