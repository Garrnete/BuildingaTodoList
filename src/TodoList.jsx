import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, dispatch }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}