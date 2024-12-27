import { TodoList } from './components/TodoList';
import './TodoItem.css';

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;