import React, { useState } from "react";

export default function TodoItem({ todo, dispatch }) {
  const [editValue, setEditValue] = useState(todo.text);

  function handleSave() {
    if (editValue.trim() !== "") {
      dispatch({ type: "save", id: todo.id, text: editValue });
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: "toggle", id: todo.id })}
      />

      {todo.editing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: "edit", id: todo.id })}>
            Edit
          </button>
          <button
            onClick={() => dispatch({ type: "delete", id: todo.id })}
            disabled={!todo.completed}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}