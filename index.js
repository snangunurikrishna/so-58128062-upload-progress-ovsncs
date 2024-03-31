import React, { useState } from 'react';
import { render } from 'react-dom';
import './style.css';

// TodoItem component to display each individual todo
const TodoItem = ({ todo, toggleTodo }) => {
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <div className="todo-item">
      {' '}
      {/* Apply todo-item class */}
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
    </div>
  );
};

// TodoList component to display the list of todos
const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div className="todo-container">
      {' '}
      {/* Apply todo-container class */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

// TodoForm component for adding new todos
const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {' '}
      {/* Apply todo-form class */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

// TodoApp component - main component for managing todos
const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('ALL');

  // Function to add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: todos.length + 1, // simple id generation
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Function to toggle the completed status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to filter todos based on filter type
  const filteredTodos = () => {
    switch (filter) {
      case 'ACTIVE':
        return todos.filter((todo) => !todo.completed);
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todo-app">
      {' '}
      {/* Apply todo-app class */}
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filter-buttons">
        {' '}
        {/* Apply filter-buttons class */}
        <button onClick={() => setFilter('ALL')}>All</button>
        <button onClick={() => setFilter('ACTIVE')}>Active</button>
        <button onClick={() => setFilter('COMPLETED')}>Completed</button>
      </div>
      <TodoList todos={filteredTodos()} toggleTodo={toggleTodo} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
