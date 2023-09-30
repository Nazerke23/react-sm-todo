import { useState } from "react";
import Task from "./Task";
import UpdateTask from "./UpdateTask";

function getRandomColor(colorIndexes, setColorIndexes) {
  const colorArray = [
    "rgb(244, 125, 61)",
    "rgb(18, 216, 14)",
    "rgb(97, 20, 221)",
    "rgb(208, 54, 255)",
    "rgb(255, 179, 79)",
  ];

  let random = Math.floor(Math.random() * colorArray.length);
  if (colorIndexes.at(-1) === random && random < colorArray.length - 1) {
    random = colorArray.length - 1;
  }

  if (colorIndexes.at(-1) === random && random === colorArray.length) {
    random = 0;
  }

  setColorIndexes((colorIndexes) => [...colorIndexes, random]);

  return colorArray[random];
}

function App() {
  const [input, setInput] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [colorIndexes, setColorIndexes] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodoArray((todoArray) => [
      ...todoArray,
      {
        title: input,
        id: Date.now(),
        color: getRandomColor(colorIndexes, setColorIndexes),
      },
    ]);
    setInput("");
  }

  function handleDelete(id) {
    setTodoArray((todoArray) => todoArray.filter((todo) => todo.id !== id));
  }

  function handleUpdate(id) {
    setIsUpdating(true);
    setCurrentTask(todoArray.find((todo) => todo.id === id));
  }

  return (
    <div className="flex-container">
      <div className="black-box">
        <h1>What's the Plan for today?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a to do"
          />
          <button>Add Todo</button>
        </form>

        {isUpdating && (
          <UpdateTask
            todo={currentTask}
            setTodoArray={setTodoArray}
            setIsUpdating={setIsUpdating}
          />
        )}
        {!isUpdating &&
          todoArray.map((todo) => (
            <Task
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
