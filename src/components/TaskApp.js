import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/tasks').then((response) => setTasks(response.data));
  }, []);

  const addTask = async () => {
    if (title.trim()) {
      console.log(`Adding task: ${title}`);
      const response = await axios.post('/tasks', { title, completed: false });
      console.log('Task added:', response.data);
      setTasks([...tasks, response.data]);
      setTitle('');
    } else {
      console.log('Task title is empty, not adding task.');
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    const response = await axios.put(`/tasks/${id}`, { ...task, completed: !task.completed });
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => toggleTask(task._id)}>Toggle</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
