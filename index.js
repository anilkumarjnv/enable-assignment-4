const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());


let tasks = [
  { id: 1, name: 'Task 1', description: 'Description 1', status: 'Incomplete' },
  { id: 2, name: 'Task 2', description: 'Description 2', status: 'Complete' },
];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  newTask.name='Task '+newTask.id;
  newTask.description= 'Description '+newTask.id;
  newTask.status='Incomplete';
  tasks.push(newTask);

  res.status(201).json(newTask);
});


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


app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const originalLength = tasks.length;
  

    tasks = tasks.filter(task => task.id !== taskId);
  
    if (tasks.length < originalLength) {
      res.json({ message: 'Task deleted successfully', remainingTasks: tasks });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
