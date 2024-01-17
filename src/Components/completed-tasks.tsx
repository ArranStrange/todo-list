import React from "react";
import { useState } from "react";
import { ITask } from "./interfaces";
import "../App.css";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  editing: boolean;
  toggleEdit(): void;
  updateTask(updatedTask: ITask): void;
  completeTask(taskId: string): void;
}

interface CompletedTasksProps {
  completedTasks: ITask[];
}
const CompletedTasks: React.FC<CompletedTasksProps> = ({ completedTasks }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="todo-list">
      <div className="tasks">
        <div className="content completedcontent">
          <button className="completeButton">Restore</button>
          {completedTasks.map((task) => (
            <span key={task.id} className="todo1">
              {task.taskName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedTasks;
