import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./Components/todo-task";
import { ITask } from "./Components/interfaces";
import logoTitle from "./Assets/logoTitle.png";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("Not Set");
  const [taskDate, setTaskDate] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTaskDate(today);
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "deadline") {
      setDeadline(String(event.target.value));
    } else if (event.target.name === "deadline") {
      setDeadline(String("Not Set"));
    } else if (event.target.name === "taskDate") {
      setTaskDate(String(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, taskDate: taskDate, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline("Not Set"); // Clear the deadline state
  };

  const toggleEdit = (taskName: string): void => {
    setEditingTask(editingTask === taskName ? null : taskName);
  };

  const updateTask = (taskName: string, updatedTask: ITask): void => {
    setTodoList((prevTasks) =>
      prevTasks.map((task) => (task.taskName === taskName ? updatedTask : task))
    );
    setEditingTask("");
  };
  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <img className="header-image" src={logoTitle} alt="Green Tick" />
        <div className="inputContainer">
          <input
            className="taskInput"
            type="text"
            placeholder="Task..."
            name="task"
            maxLength={100}
            value={task}
            onChange={handleChange}
          />
          {/* <input
            type="date"
            name="taskDate"
            value={taskDate}
            onChange={handleChange}
          /> */}
          <input
            type="date"
            placeholder="Completion Date"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
          <button onClick={addTask}>ADD</button>
        </div>
      </div>
      <div className="todoList">
        {todoList
          .slice()
          .reverse()
          .map((task: ITask, key: number) => (
            <TodoTask
              key={key}
              task={task}
              deleteTask={deleteTask}
              editing={editingTask === task.taskName}
              toggleEdit={() => toggleEdit(task.taskName)}
              updateTask={(updatedTask) =>
                updateTask(task.taskName, updatedTask)
              }
            />
          ))}
      </div>
    </div>
  );
};

export default App;
