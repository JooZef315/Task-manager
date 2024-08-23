export enum TaskStatus {
  Not_Started = "Not Started",
  In_Progress = "In Progress",
  Finished = "Finished",
}

export type Task = {
  id: string;
  description: string;
  status: TaskStatus;
};

export type TaskToEdit = {
  id: string;
} & Partial<Omit<Task, "id">>;
