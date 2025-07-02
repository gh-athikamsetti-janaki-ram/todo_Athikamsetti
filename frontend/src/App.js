import React from 'react';
import TaskList from './components/TaskList';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="my-4">
      <TaskList />
    </Container>
  );
}

export default App;