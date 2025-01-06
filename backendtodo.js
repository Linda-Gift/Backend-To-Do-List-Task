// backendToDo.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let todos = []; // an empty To-Do array
let idCounter = 1; // For generating unique IDs

// 1. Create a To-Do Item
app.post('/api/todos', (req, res) => {
    const { title, description, dueDate, status } = req.body;
    const newTodo = { id: idCounter++, title, description, dueDate, status };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// 2. Get All To-Do Items
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// 3. Get a Single To-Do Item
app.get('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) return res.status(404).json({ message: 'To-Do not found' });
    res.json(todo);
});

// 4. Update a To-Do Item
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) return res.status(404).json({ message: 'To-Do not found' });

    // Update fields
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (dueDate) todo.dueDate = dueDate;
    if (status) todo.status = status;

    res.json(todo);
});

// 5. Delete a To-Do Item
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) return res.status(404).json({ message: 'To-Do not found' });

    todos.splice(todoIndex, 1); // Remove from array
    res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
