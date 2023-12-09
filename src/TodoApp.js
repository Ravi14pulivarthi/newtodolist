import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterType, setFilterType] = useState('all'); // all or completed

  // Fetch todos from API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos: ', error);
      });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask = {
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTask]);
      setNewTodo('');
    }
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (id, newTitle) => {
    if (newTitle.trim() !== '') {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = filterType === 'completed' 
    ? todos.filter(todo => todo.completed)
    : todos;

  return (
    <div style={{paddingLeft:"100px"}}>
      <h1>Todo List</h1>

      <div >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
         style={{width:"70%",padding:"20px",gap:"10px"}}
        />
        <button style={{height:"30px",width:"80px"}}  onClick={addTodo}>Add</button>
      </div>

      <div>
        <button style={{height:"30px",width:"80px"}} onClick={() => setFilterType('all')}>All</button>
        <button style={{height:"30px",width:"80px"}}  onClick={() => setFilterType('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <div style={{width:"80%",padding:"10px",border:"1px solid ",fontSize:"25px"}} key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompleted(todo.id)}
            >
              {todo.title}
            </span>
             <div  style={{ display:'flex',gap:"10px"}}> 
             <button  style={{height:"30px",width:"50px"}} onClick={() => handleEdit(todo.id, prompt('Edit Task', todo.title))}>Edit</button>
            <button  style={{height:"30px",width:"50px"}} onClick={() => handleDelete(todo.id)}>Delete</button>
             </div>
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
