import { useState } from "react";

function Task({ todo, onDelete, onUpdate }) {
  const [isComplete, setComplete] = useState(false);
  return (
    <div
      onClick={() => setComplete((isComplete) => !isComplete)}
      className="task-component"
      style={{ backgroundColor: todo.color, opacity: isComplete ? "0.5" : "1" }}
    >
      <h3>{todo.title} </h3>
      <div className="crud-buttons">
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
        <button onClick={() => onUpdate(todo.id)}>📀</button>
      </div>
    </div>
  );
}

export default Task;
