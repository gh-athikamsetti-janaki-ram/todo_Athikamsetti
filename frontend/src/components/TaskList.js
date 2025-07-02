import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Alert, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDueDate, setFilterDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      let url = 'http://localhost:8080/api/tasks';
      const params = new URLSearchParams();
      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }
      if (filterCategory) {
        params.append('category', filterCategory);
      }
      if (filterDueDate) {
        // Send as ISO string if backend expects LocalDateTime, else just the date
        params.append('dueDate', filterDueDate);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      console.log('Fetching from:', url); // Debug
      const response = await axios.get(url);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError(`Failed to fetch tasks: ${err.message}`);
      console.error('Fetch error:', err);
    }
  }, [filterStatus, filterCategory, filterDueDate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(`Failed to delete task: ${err.message}`);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      setError(`Failed to mark task as complete: ${err.message}`);
    }
  };

  const handleSave = () => {
    setEditingTask(null);
    setShowForm(false);
    fetchTasks();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary">Todo List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="success"
        onClick={() => setShowForm(true)}
        className="mb-4 w-100 w-md-auto"
      >
        Add New Task
      </Button>
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={() => {
            setEditingTask(null);
            setShowForm(false);
          }}
        />
      )}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Category</Form.Label>
              <Form.Control
                type="text"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                placeholder="Enter category"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Due Date</Form.Label>
              <Form.Control
                type="date"
                value={filterDueDate}
                onChange={(e) => setFilterDueDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description || '-'}</td>
                  <td>{new Date(task.dueDate).toLocaleString()}</td>
                  <td>
                    {[...Array(task.priority)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </td>
                  <td>{task.category || '-'}</td>
                  <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                  <td>
                    {!task.completed && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleComplete(task.id)}
                        className="me-2"
                      >
                        Complete
                      </Button>
                    )}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setEditingTask(task);
                        setShowForm(true);
                      }}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskList;