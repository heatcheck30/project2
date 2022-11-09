const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    priority: { type: String, required: true},
    task: { type: String, required: true},
    completed: Boolean
})

const Todo = mongoose.model("Todo", todoSchema)


module.exports = Todo

