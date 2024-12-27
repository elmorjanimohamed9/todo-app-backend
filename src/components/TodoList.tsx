import { useState, useEffect } from 'react';
import { TodoAPI } from '../services/api';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  };

  const loadTodos = async () => {
    try {
      const data = await TodoAPI.getAllTodos();
      setTodos(data);
    } catch {
      showError('Error loading todos');
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    
    try {
      const todo = await TodoAPI.createTodo({ title: newTodo });
      setTodos([...todos, todo]);
      setNewTodo('');
    } catch {
      showError('Error creating todo');
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await TodoAPI.updateTodo(id, { completed });
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed } : todo
      ));
    } catch {
      showError('Error updating todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await TodoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch {
      showError('Error deleting todo');
    }
  };

  return (
    <div className="todo-container">
      <div className="input-group">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};