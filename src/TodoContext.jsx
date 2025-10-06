import React, { createContext, useReducer, useState } from "react";

// Create Context
export const TodoContext = createContext();

// Reducer function for todos
function todoReducer(todos, action) {
  switch (action.type) {
    case "add":
      return [
        { id: Date.now(), text: action.text, completed: false, editing: false },
        ...todos,
      ];
    case "toggle":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "delete":
      return todos.filter((todo) => todo.id !== action.id);
    case "edit":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, editing: true } : todo
      );
    case "save":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text, editing: false } : todo
      );
    default:
      return todos;
  }
}

// Provider component
export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState("");

  // 🌙 NEW — theme state
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <TodoContext.Provider
      value={{ todos, dispatch, newTask, setNewTask, theme, toggleTheme }}
    >
      {children}
    </TodoContext.Provider>
  );
}