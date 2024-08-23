export enum TaskStatus {
  Not_Started = "Not_Started",
  In_Progress = "In_Progress",
  Finished = "Finished",
}

export type TTask = {
  id: string;
  description: string;
  status: TaskStatus;
};

export type TaskToEdit = {
  id: string;
} & Partial<Omit<TTask, "id">>;
