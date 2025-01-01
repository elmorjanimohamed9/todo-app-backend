import axios, { AxiosInstance } from 'axios';
import { Todo, CreateTodoDto } from '../types/todo';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL, 
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const TodoAPI = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axiosInstance.get('/todo');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    try {
      const response = await axiosInstance.post('/todo', todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    try {
      const response = await axiosInstance.patch(`/todo/${id}`, todo);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async deleteTodo(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/todo/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};

export const api = axiosInstance;
