import React, { useState, useReducer } from "react";
import TodoList from "./TodoList";
import "./styles.css";

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

export default function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState("");
  const [theme, setTheme] = useState("light");

  function handleAdd(e) {
    e.preventDefault();
    if (newTask.trim() === "") return;
    dispatch({ type: "add", text: newTask });
    setNewTask("");
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>Create Todo List</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
}



