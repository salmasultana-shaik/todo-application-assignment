const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo');

app.use('/tasks', taskRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
