export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
  }
  
  export interface CreateTodoDto {
    title: string;
    completed?: boolean;
  }