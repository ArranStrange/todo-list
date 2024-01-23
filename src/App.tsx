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
  const [urgency, setUrgency] = useState<string>("Med");
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
      urgency: urgency as "Low" | "Med" | "High",
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
    if (selectedSortOrder === "dateSetNewToOld") {
      sortByDateSetNewToOld();
    }
    if (selectedSortOrder === "dateSetOldToNew") {
      sortByDateSetOldtoNew();
    }
    if (selectedSortOrder === "deadline") {
      sortByDeadline();
    }
    if (selectedSortOrder === "urgency") {
      sortByUrgency();
    }
  };

  const sortByDateSetNewToOld = (): void => {
    setTodoList((prevTasks) =>
      prevTasks
        .slice()
        // .reverse()
        .sort(
          (a, b) =>
            new Date(b.taskDate).getTime() - new Date(a.taskDate).getTime()
        )
    );
  };
  const sortByDateSetOldtoNew = (): void => {
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

  const urgencyWeights: Record<"Low" | "Med" | "High", number> = {
    High: 3,
    Med: 2,
    Low: 1,
  };

  const sortByUrgency = (): void => {
    setTodoList((prevTasks: ITask[]) =>
      prevTasks
        .slice()
        .reverse()
        .sort((a: ITask, b: ITask) => {
          const weightA = urgencyWeights[a.urgency] || 0;
          const weightB = urgencyWeights[b.urgency] || 0;

          return weightB - weightA; // Sort in descending order of urgency weights
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
              className={`urgencyButton low ${
                urgency === "Low" ? "active" : ""
              }`}
              onClick={() => setUrgency("Low")}
            >
              Low
            </button>
            <button
              className={`urgencyButton med ${
                urgency === "Med" ? "active" : ""
              }`}
              onClick={() => setUrgency("Med")}
            >
              Med
            </button>
            <button
              className={`urgencyButton high ${
                urgency === "High" ? "active" : ""
              }`}
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
            <option value="dateSetNewToOld">Most Recent to Oldest</option>
            <option value="dateSetOldToNew">Oldest to Most Recent</option>
            <option value="deadline">Deadline</option>
            <option value="urgency">Urgency</option>
          </select>
        </div>
      </div>
      <div className="todoList">
        {todoList.slice().map((task: ITask) => (
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
