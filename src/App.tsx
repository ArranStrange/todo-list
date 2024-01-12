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
    const today = new Date().toISOString().split("T")[0]; //gets todays date
    setTaskDate(today); //sets taskDate to todays date
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
      //Checks the input elements name is === "task", if so updates to inputted value
    } else if (event.target.name === "deadline") {
      setDeadline(event.target.value === "" ? "Not Set" : event.target.value); // else if Shorthand
      //Checks the input elements name is === "deadline", if so updates to inputted value
    } else if (event.target.name === "taskDate") {
      setTaskDate(String(event.target.value));
      //Checks the input elements name is === "taskDate", if so updates to inputted value
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, taskDate: taskDate, deadline: deadline };
    setTodoList([...todoList, newTask]); // CREATES NEW OBJECT WITH INPUTTED DATA
    setTask(""); // CLEAR TASK STATE
    setDeadline("Not Set"); // CLEAR DEADLINE STATE
    // console.log(newTask);
  };

  const toggleEdit = (taskName: string): void => {
    setEditingTask(editingTask === taskName ? null : taskName); // taskName ? null : taskName === else if statement
    // editingTask == taskName then in editing mode
    //if !== then put into editing mode (setEditingTask)
  };

  const updateTask = (taskName: string, updatedTask: ITask): void => {
    setTodoList((prevTasks) =>
      prevTasks.map((task) => (task.taskName === taskName ? updatedTask : task))
    );
    // iterates over array of tasks in previous state, if taskName === taskName updates with updatedTask creating a new array, if !== keeps task unchanged
    setEditingTask(""); //resets the state
  };

  const deleteTask = (taskNameToDelete: string): void => {
    // Starts updating the todoList when button clicked
    setTodoList(
      // Create a new array by keeping only tasks that don't match the taskNameToDelete
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete; //if task name !== taskNameToDelete, task is kept in new array
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
            value={task} //sets input to the value of task
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
            value={deadline} //sets input to the value of deadline
            onChange={handleChange}
          />
          <button onClick={addTask}>Add Task</button>
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
