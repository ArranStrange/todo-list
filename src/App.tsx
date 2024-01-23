import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./Components/todo-task";
import CompletedTasks from "./Components/completed-tasks";
import { ITask } from "./Components/interfaces";
import logoTitle from "./Assets/2.png";
import { generateGUID } from "./Utils/guid";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>("");

  useEffect(() => {
    const today = new Date().toISOString().split(".")[0]; // gets today's date and time
    setTaskDate(today); // sets taskDate to today's date and time
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "deadline") {
      setDeadline(event.target.value === "" ? "" : event.target.value);
    } else if (event.target.name === "taskDate") {
      setTaskDate(String(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      id: generateGUID(),
      taskName: task,
      taskDate: taskDate,
      deadline: deadline,
      urgency: urgency,
      isCompleted: false,
    };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline("Null");
    setUrgency("Med"); // Set default urgency to "Med"
  };

  const toggleEdit = (id: string): void => {
    setEditingTask(editingTask === id ? null : id);
  };

  const updateTask = (id: string, updatedTask: ITask): void => {
    setTodoList((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
    setEditingTask("");
  };

  const deleteTask = (taskIdToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.id !== taskIdToDelete));
  };

  const deleteCompletedTask = (taskIdToDelete: string): void => {
    setCompletedTasks(
      completedTasks.filter((task) => task.id !== taskIdToDelete)
    );
  };

  const completeTask = (taskId: string): void => {
    const existingTask = todoList.find((task) => task.id === taskId);
    if (existingTask) {
      setCompletedTasks([...completedTasks, existingTask]);
      setTodoList(todoList.filter((task) => task.id !== taskId));
    }
  };

  const restoreTask = (taskId: string): void => {
    const restoredTask = completedTasks.find((task) => task.id === taskId);

    if (restoredTask) {
      setTodoList((prevTodoList) => [...prevTodoList, restoredTask]);
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleSortBy = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedSortOrder = event.target.value;
    if (selectedSortOrder === "dateSet") {
      sortByDateSet();
    }
    if (selectedSortOrder === "deadline") {
      sortByDeadline();
    }
  };

  const sortByDateSet = (): void => {
    setTodoList((prevTasks) =>
      prevTasks
        .slice()
        .sort(
          (a, b) =>
            new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime()
        )
    );
  };

  const sortByDeadline = (): void => {
    setTodoList((prevTasks) =>
      prevTasks
        .slice()
        .sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        )
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
          <div className="deadlineTitle">Set Deadline:</div>
          <div className="urgencyTitle">Set Urgency:</div>
          <input
            type="date"
            placeholder="Completion Date"
            name="deadline"
            className="deadlineInput"
            id="date"
            value={deadline}
            onChange={handleChange}
          />
          <div className="urgencyToggle">
            <button
              className={`urgencyButton ${urgency === "Low" ? "active" : ""}`}
              onClick={() => setUrgency("Low")}
            >
              Low
            </button>
            <button
              className={`urgencyButton ${urgency === "Med" ? "active" : ""}`}
              onClick={() => setUrgency("Med")}
            >
              Med
            </button>
            <button
              className={`urgencyButton ${urgency === "High" ? "active" : ""}`}
              onClick={() => setUrgency("High")}
            >
              High
            </button>
          </div>
          <button className="addTaskButton" onClick={addTask}>
            Add
          </button>
        </div>
        <div className="dropDown">
          <label>Sort by: </label>
          <select onChange={handleSortBy}>
            <option value="dateSet">Date Created</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask) => (
          <TodoTask
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editing={editingTask === task.id}
            toggleEdit={() => toggleEdit(task.id)}
            updateTask={(updatedTask) => updateTask(task.id, updatedTask)}
            completeTask={completeTask}
            urgency={task.urgency}
          />
        ))}
        <CompletedTasks
          completedTasks={completedTasks}
          urgency={urgency}
          onRestoreTask={restoreTask}
          deleteTask={deleteCompletedTask}
        />
      </div>
    </div>
  );
};

export default App;
