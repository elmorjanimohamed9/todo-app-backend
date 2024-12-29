import axios from 'axios';
import { Todo, CreateTodoDto } from '../types/todo';

const API_URL = import.meta.env.VITE_API_URL;

export const TodoAPI = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get(`${API_URL}/todo`);
    return response.data;
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const response = await axios.post(`${API_URL}/todo`, todo);
    return response.data;
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const response = await axios.patch(`${API_URL}/todo/${id}`, todo);
    return response.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${API_URL}/todo/${id}`);
  }
};