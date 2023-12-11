const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [
  { id: 1, name: 'Task 1', description: 'Description 1', status: 'Incomplete' },
  { id: 2, name: 'Task 2', description: 'Description 2', status: 'Complete' },
];

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Display a list of all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Display details of a specific task based on its ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Add a new task to the collection
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  newTask.name='Task '+newTask.id;
  newTask.description= 'Description '+newTask.id;
  newTask.status='Incomplete';
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update the details of a specific task based on its ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === taskId);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a specific task based on its ID
// Delete a specific task based on its ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const originalLength = tasks.length;
  
    // Remove the task from the array
    tasks = tasks.filter(task => task.id !== taskId);
  
    if (tasks.length < originalLength) {
      res.json({ message: 'Task deleted successfully', remainingTasks: tasks });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
