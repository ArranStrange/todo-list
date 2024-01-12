import React, { useState, ChangeEvent } from "react";
import { ITask } from "./interfaces";
import editIcon from "src/Assets/4.png";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  editing: boolean;
  toggleEdit(): void;
  updateTask(updatedTask: ITask): void;
}

const TodoTask: React.FC<Props> = ({
  task,
  deleteTask,
  editing,
  toggleEdit,
  updateTask,
}) => {
  const [editedTask, setEditedTask] = useState<ITask>({ ...task });

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

  return (
    <div className="tasks">
      <div className="content">
        {/* STATE ON EDIT */}
        {editing ? (
          <>
            <input
              type="text"
              name="taskName"
              className="todo1"
              value={editedTask.taskName}
              onChange={handleChange}
              onBlur={handleSave}
            />
            <button className="editButton" onClick={handleSave}>
              Save
            </button>
            <input
              type="date"
              name="taskDate"
              className="todoDateSet"
              value={editedTask.taskDate}
              onChange={handleChange}
              onBlur={handleSave}
            />
            <input
              type="date"
              name="deadline"
              className="todoCompletetionDate"
              value={editedTask.deadline}
              onChange={handleChange}
              onBlur={handleSave}
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
            <span onClick={toggleEdit} className="todo1">
              {task.taskName}
            </span>
            <button className="editButton" onClick={toggleEdit}>
              Edit
            </button>
            <span onClick={toggleEdit} className="todoDateSet">
              {task.taskDate}
            </span>
            <span onClick={toggleEdit} className="todoCompletetionDate">
              {task.deadline}
            </span>
            <button
              className="deleteButton"
              onClick={() => deleteTask(task.taskName)}
            >
              X
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoTask;
