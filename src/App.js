import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';

function App() {
  const [textBoxes, setTextBoxes] = useState([{ value: 0, error: '' }]);
  const [total, setTotal] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTextBox = () => {
    setTextBoxes(prevState => [...prevState, { value: 0, error: '' }]);
  };

  const deleteTextBox = index => {
    if (textBoxes[index].value) {
      setTotal(prevTotal => prevTotal - textBoxes[index].value);
    }
    setTextBoxes(prevState => {
      const updatedTextBoxes = [...prevState];
      updatedTextBoxes.splice(index, 1);
      return updatedTextBoxes;
    });
  };

  const handleTextBoxChange = (index, value) => {
    if (!isNaN(value)) {
      const updatedTextBoxes = [...textBoxes];
      updatedTextBoxes[index] = { value: parseInt(value), error: '' };
      setTextBoxes(updatedTextBoxes);
      if (textBoxes.length === 1) {
        setTotal(parseInt(value));
      } else {
        calculateTotal(updatedTextBoxes);
      }
    } else {
      const updatedTextBoxes = [...textBoxes];
      updatedTextBoxes[index] = { value: value, error: '' };
      setTextBoxes(updatedTextBoxes);
      setTotal(prevTotal => prevTotal - parseInt(textBoxes[index].value));
    }
  };

  const calculateTotal = textBoxValues => {
    const sum = textBoxValues.reduce((acc, curr) => acc + curr.value, 0);
    setTotal(sum);
  };

  const handleTaskNameChange = event => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = event => {
    setTaskDescription(event.target.value);
  };

  const addTask = () => {
    if (taskName.trim() === '' || taskDescription.trim() === '') {
      alert('Please enter both task name and description');
      return;
    }
    if (editIndex === -1) {
      setTasks([...tasks, { name: taskName, description: taskDescription }]);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { name: taskName, description: taskDescription };
      setTasks(updatedTasks);
      setEditIndex(-1);
    }
    setTaskName('');
    setTaskDescription('');
  };

  const editTask = index => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    setEditIndex(index);
  };

  const deleteTask = index => {
    setTasks(prevTasks => prevTasks.filter((task, i) => i !== index));
  };

  return (
    <Container className="App">
      <h1 className="mt-3">Textbox and Task Manager</h1>
      <div className="d-flex justify-content-between">
        <div style={{ width: '45%' }}>
          <h2>Textbox Manager</h2>
          <button className="btn btn-primary mb-3" onClick={addTextBox}>Add Textbox</button>
          {textBoxes.map((textBox, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                value={textBox.value}
                onChange={e => handleTextBoxChange(index, e.target.value)}
              />
              <button className="btn btn-danger ms-2" onClick={() => deleteTextBox(index)}>Delete</button>
              {textBox.error && <p style={{ color: 'red' }}>{textBox.error}</p>}
            </div>
          ))}
          <h2>Total: {total}</h2>
        </div>
        <div style={{ width: '45%' }}>
          <h2 className="mt-3">Task Manager</h2>
          <Form className="mb-3">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Task Name"
                aria-label="Task Name"
                value={taskName}
                onChange={handleTaskNameChange}
              />
              <FormControl
                placeholder="Task Description"
                aria-label="Task Description"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
              />
              <Button variant="primary" onClick={addTask}>{editIndex === -1 ? 'Add Task' : 'Save'}</Button>
            </InputGroup>
          </Form>
          {tasks.map((task, index) => (
            <div key={index} className="mb-3">
              <div className="task-box p-3 border">
                <h3><strong>{task.name}</strong></h3>
                <p>{task.description}</p>
                <div>
                  <Button className="me-2" variant="warning" onClick={() => editTask(index)}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteTask(index)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
