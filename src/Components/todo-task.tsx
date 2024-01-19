import React, { useState, ChangeEvent } from "react";
import { ITask } from "./interfaces";
import editIcon from "../Assets/4.png";
import binIcon from "../Assets/3.png";
import closeIcon from "../Assets/closeIcon.png";
import uncheckedBox from "../Assets/uncheckedBox.png";

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
    <div className="task">
      <div className="content" data-created={editedTask.taskDate.split("T")}>
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
              <img src={uncheckedBox} className="checkboxIcon" alt="checkbox" />
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
            <button className="editButton" onClick={handleSave}>
              <img src={closeIcon} alt="save icon" className="editIcon" />
            </button>

            {/* <fieldset className="setDate">
              <label>Date Set:</label>
              <input
                type="date"
                name="taskDate"
                className="todoDateSet"
                value={editedTask.taskDate}
                onChange={handleChange}
                // onBlur={handleSave}
              />
            </fieldset> */}
            <fieldset className="DeadlineDate">
              <label>Update Deadline:</label>
              <input
                type="date"
                name="deadline"
                className="todoCompletetionDate"
                value={editedTask.deadline}
                onChange={handleChange}
                // onBlur={handleSave}
              />
            </fieldset>

            <button
              className="deleteButton"
              onClick={() => deleteTask(task.id)}
            >
              <img src={binIcon} alt="Bin icon" className="binIcon" />
            </button>
          </>
        ) : (
          // NORMAL STATE
          <>
            <button
              className="completeButton"
              onClick={() => {
                handleComplete();
                handleIsVisible();
              }}
            >
              <img src={uncheckedBox} className="checkboxIcon" alt="checkbox" />
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
              <img src={editIcon} className="editIcon" alt="Edit icon" />
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
