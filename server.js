const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Todo = require('./models/todo.js')

require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
mongoose.connect(process.env.DATABASE_URL, {
})

const db = mongoose.connection
db.on("error", (err)=> console.log(err.message + " is mongo not running?"))
db.on("connected", ()=> console.log("mongo connected"))
db.on("disconnected", ()=> console.log("mongo DISCONNECTED"))


// MIDDLEWARE
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride("_method"))



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

// DELETE
app.delete("/todo/:id", (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deletedTask) => {
        console.log(deletedTask)
        res.redirect("/todo")
    })
})

// UPDATE
app.put("/todo/:id", (req, res) => {
    if(req.body.completed === "on"){
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    Todo.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, 
        (err, updatedTodo) => {
        res.redirect(`/todo/${req.params.id}`);
    })
})

// CREATE
app.post("/todo", (req, res) => {
    if(req.body.completed === "on"){
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    
    Todo.create(req.body, (error, createdTodo) => {
        res.redirect("/todo");
    })
})


// EDIT
app.get("/todo/:id/edit", (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
    res.render("edit.ejs", { todo: foundTodo});
    })
})


// SHOW

app.get("/todo/:id", (req, res)=> {
    Todo.findById(req.params.id, (err, foundTodo)=> {
        res.render("show.ejs", { todo: foundTodo })
    })
})




app.listen(PORT, ()=> console.log(`You are listening to the smoothe sounds of port ${PORT}...`))