import { create } from "zustand";
import { Task, TaskStatus } from "../types";

type TasksStore = {
  tasks: Task[];
  addTask(task: Task): void;
  editTask(updatedtask: Task): void;
  deleteTask(id: string): void;
  clearTasks(): void;
  filterByStatus: (status: TaskStatus) => void;
  sortByDescription: (order: "asc" | "desc") => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  addTask(task) {
    localStorage.setItem("tasks", JSON.stringify([...this.tasks, task]));
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  editTask(updatedtask) {
    const updatedTasks = this.tasks.map((task) =>
      task.id === updatedtask.id ? updatedtask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    set({ tasks: [...updatedTasks] });
  },
  deleteTask(id) {
    const tasksAfterDeletion = this.tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasksAfterDeletion));
    set({ tasks: [...tasksAfterDeletion] });
  },
  clearTasks() {
    localStorage.setItem("tasks", JSON.stringify([]));
    set({ tasks: [] });
  },
  filterByStatus(status) {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.status === status),
    }));
  },
  sortByDescription(order) {
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) =>
        order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      ),
    }));
  },
}));
