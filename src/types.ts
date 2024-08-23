export enum TaskStatus {
  Not_Started = "Not Started",
  In_Progress = "In Progress",
  Finished = "Finished",
}

export type Task = {
  description: string;
  status: TaskStatus;
};
