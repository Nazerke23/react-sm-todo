import { useEffect, useRef, useState } from "react";

function UpdateTask({ todo, setIsUpdating, setTodoArray }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setIsUpdating(false);
    setTodoArray((todoArray) =>
      todoArray.map((todoEach) =>
        todoEach.id === todo.id ? { ...todoEach, title: newTitle } : todoEach
      )
    );
  }

  return (
    <form className="update-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        ref={inputEl}
        placeholder="Add a to do"
      />
      <button>Update</button>
    </form>
  );
}

export default UpdateTask;
