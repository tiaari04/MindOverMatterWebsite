import React, { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <h2>To Do List</h2>
      <ul id="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="task-checkbox"
              onChange={() => removeTask(index)}
            />
            {task}
          </li>
        ))}
      </ul>
      <div className="add-task-container">
        <input
          type="text"
          id="task-input"
          placeholder="New task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button id="add-task-btn" onClick={addTask}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
