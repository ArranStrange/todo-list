export interface ITask {
  id: string;
  taskName: string;
  taskDate: string;
  deadline: string;
  urgency: "Low" | "Med" | "High";
  isCompleted: boolean;
}
