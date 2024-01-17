import React from "react";
import { ITask } from "./interfaces";
import "../App.css";

interface CompletedTasksProps {
  completedTasks: ITask[];
  onRestoreTask: (taskId: string) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  completedTasks,
  onRestoreTask,
}) => {
  const handleRestore = (taskId: string) => {
    // Call the callback function provided by the parent component
    onRestoreTask(taskId);
  };

  return (
    <>
      <div className="tasks ">
        <div className="completed-content">
          {completedTasks.map((task) => (
            <div key={task.id}>
              <span className="todo1">{task.taskName}</span>
              <button
                className="completeButton"
                onClick={() => handleRestore(task.id)}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompletedTasks;
