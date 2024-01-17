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
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; //gets todays date
    setTaskDate(today); //sets taskDate to todays date
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
      //Checks the input elements name is === "task", if so updates to inputted value
    } else if (event.target.name === "deadline") {
      setDeadline(event.target.value === "" ? "" : event.target.value); // else if Shorthand
      //Checks the input elements name is === "deadline", if so updates to inputted value
    } else if (event.target.name === "taskDate") {
      setTaskDate(String(event.target.value));
      //Checks the input elements name is === "taskDate", if so updates to inputted value
    }
  };

  const addTask = (): void => {
    const newTask = {
      id: generateGUID(),
      taskName: task,
      taskDate: taskDate,
      deadline: deadline,
      isCompleted: false,
    };
    setTodoList([...todoList, newTask]); // CREATES NEW OBJECT WITH INPUTTED DATA
    setTask(""); // CLEAR TASK STATE
    setDeadline(""); // CLEAR DEADLINE STATE
    console.log(newTask);
  };

  const toggleEdit = (id: string): void => {
    setEditingTask(editingTask === id ? null : id); // taskName ? null : taskName === else if statement
    // editingTask == taskName then in editing mode
    //if !== then put into editing mode (setEditingTask)
  };

  const updateTask = (id: string, updatedTask: ITask): void => {
    setTodoList((prevTasks) =>
      prevTasks.map((task) => {
        console.log(task, id);
        if (task.id === id) {
          if (task.taskName !== updatedTask.taskName) {
            return updatedTask;
          }
        }
        return task;
      })
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

  const completeTask = (taskId: string): void => {
    setTodoList((prevTasks: ITask[]) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          // Mark the task as completed
          return { ...task, isCompleted: true };
        }
        return task;
      });

      const completedTask = updatedTasks.find(
        (task) => task.id === taskId && task.isCompleted
      );

      if (completedTask) {
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          completedTask,
        ]);

        // Remove the completed task from the original array
        const remainingTasks = updatedTasks.filter(
          (task) => task.id !== taskId
        );

        // Return the updated array of remaining tasks
        return remainingTasks;
      } else {
        return prevTasks;
      }
    });
  };

  const restoreTask = (taskId: string): void => {
    // Find the task in completedTasks
    const restoredTask = completedTasks.find((task) => task.id === taskId);

    if (restoredTask) {
      // Add the task back to the todoList array
      setTodoList((prevTodoList) => [...prevTodoList, restoredTask]);

      // Remove the task from completedTasks
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((task) => task.id !== taskId)
      );
    }
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
            className="deadlineInput"
            id="date"
            value={deadline} //sets input to the value of deadline
            onChange={handleChange}
          />
          <button className="addTaskButton" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      <div className="todoList">
        {todoList
          .slice()
          .reverse()
          .map((task: ITask) => (
            <TodoTask
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              editing={editingTask === task.id}
              toggleEdit={() => toggleEdit(task.id)}
              updateTask={(updatedTask) => updateTask(task.id, updatedTask)}
              completeTask={completeTask}
            />
          ))}
        {/* Render the CompletedTasks component and pass completedTasks as a prop */}
        <CompletedTasks
          completedTasks={completedTasks}
          onRestoreTask={restoreTask}
        />
      </div>
    </div>
  );
};

export default App;
