import React, { useState, ChangeEvent } from "react";
import { ITask } from "./interfaces";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  editing: boolean;
  toggleEdit(): void;
  updateTask(updatedTask: ITask): void;
  completeTask(taskId: string): void;
}

const TodoTask: React.FC<Props> = ({
  task,
  deleteTask,
  editing,
  toggleEdit,
  updateTask,
  completeTask,
}) => {
  const [editedTask, setEditedTask] = useState<ITask>({ ...task });
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleIsVisible = (): void => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = (): void => {
    updateTask(editedTask);
    toggleEdit();
  };

  const handleComplete = (): void => {
    setIsCompleted((prevIsCompleted) => !prevIsCompleted); // Toggle completion state
    completeTask(task.id);
  };

  return (
    <div className="tasks">
      <div className="content" data-created={editedTask.taskDate}>
        {/* STATE ON EDIT */}
        {editing ? (
          <>
            <button
              className="completeButton"
              onClick={() => {
                handleComplete();
                handleIsVisible();
              }}
            >
              Complete Task
            </button>
            <input
              type="text"
              name="taskName"
              className="todo1 todoEditInput"
              value={editedTask.taskName}
              onChange={handleChange}
              // onBlur={() => {
              //   handleSave();
              //   handleIsVisible();
              // }}
            />
            <button
              className="editButton"
              onClick={() => {
                // toggleEdit();
                // handleIsVisible();
                handleSave();
              }}
            >
              Save
            </button>

            <input
              type="date"
              name="taskDate"
              className="todoDateSet"
              value={editedTask.taskDate}
              onChange={handleChange}
              // onBlur={handleSave}
            />

            <input
              type="date"
              name="deadline"
              className="todoCompletetionDate"
              value={editedTask.deadline}
              onChange={handleChange}
              // onBlur={handleSave}
            />

            <button
              className="deleteButton"
              onClick={() => deleteTask(task.taskName)}
            >
              X
            </button>
          </>
        ) : (
          // NORMAL STATE
          <>
            <button className="completeButton" onClick={handleComplete}>
              Complete Task
            </button>
            <span
              className="todo1"
              onClick={() => {
                toggleEdit();
              }}
              // onBlur={() => {
              //   handleSave();
              //   handleIsVisible();
              // }}
            >
              {task.taskName}
            </span>

            <button className="editButton" onClick={toggleEdit}>
              Edit
            </button>

            {isVisible && (
              <span onClick={toggleEdit} className="todoDateSet">
                {task.taskDate}
              </span>
            )}

            {isVisible && (
              <span onClick={toggleEdit} className="todoCompletetionDate">
                {task.deadline}
              </span>
            )}

            {isVisible && (
              <button
                className="deleteButton"
                onClick={() => deleteTask(task.taskName)}
              >
                X
              </button>
            )}

            {/* COMPLETED STATE */}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoTask;
