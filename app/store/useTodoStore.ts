import { create, StateCreator } from "zustand";

interface Todo {
  id: number;
  title: string;
  time: string;
  date: string;
  completed: boolean;
  subtasks?: string[];
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>((set: StateCreator<TodoState>) => ({
  todos: [
    {
      completed: false,
      date: "18/4/2025",
      description: "chava",
      id: 1744917102557,
      priority: "High",
      subtasks: [],
      time: "12:40:54 AM",
      title: "Read books",
    },
    {
      completed: false,
      date: "18/4/2025",
      description: "canva",
      id: 1744917119729,
      priority: "Medium",
      subtasks: [],
      time: "12:41:42 AM",
      title: "Design Jivani UI",
    },
  ],
  addTodo: (todo: Omit<Todo, "id">) =>
    set((state) => ({
      todos: [...state.todos, { ...todo, id: Date.now() }],
    })),
  updateTodo: (id: number, updatedTodo: Partial<Todo>) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ),
    })),
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
