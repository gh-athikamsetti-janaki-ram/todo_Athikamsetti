
import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate) : null);
  const [priority, setPriority] = useState(task ? task.priority : 1);
  const [category, setCategory] = useState(task ? task.category : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate || !priority) {
      setError('Title, due date, and priority are required.');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
      category,
      completed: task ? task.completed : false
    };

    try {
      if (task) {
        await axios.put(`http://localhost:8080/api/tasks/${task.id}`, taskData);
      } else {
        await axios.post('http://localhost:8080/api/tasks', taskData);
      }
      onSave();
      setError('');
    } catch (err) {
      setError('Failed to save task. Please try again.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="form-control"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority (1-5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category (Optional)</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
