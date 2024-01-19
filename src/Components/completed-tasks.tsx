import React from "react";
import { ITask } from "./interfaces";
import "../App.css";
import checkedBox from "../Assets/CheckedBox.png";
import binIcon from "../Assets/3.png";

interface CompletedTasksProps {
  completedTasks: ITask[];
  onRestoreTask: (taskId: string) => void;
  deleteTask: (taskNameToDelete: string) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  completedTasks,
  onRestoreTask,
  deleteTask,
}) => {
  const handleRestore = (taskId: string) => {
    // Call the callback function provided by the parent component
    onRestoreTask(taskId);
  };

  return (
    <>
      {completedTasks.map((task) => (
        <div className="task completedContent">
          <div key={task.id} className="content">
            <span className="todo1">{task.taskName}</span>
            <button
              className="completeButton"
              onClick={() => handleRestore(task.id)}
            >
              <img src={checkedBox} className="checkboxIcon" alt="checkbox" />
            </button>
            <button
              className="deleteButton"
              onClick={() => deleteTask(task.id)}
            >
              <img src={binIcon} className="binIcon" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompletedTasks;
