import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo._id, e.target.checked)}
        className="todo-checkbox"
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo._id)}
        className="delete-button"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </div>
  );
};