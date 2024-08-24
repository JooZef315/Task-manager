import { create } from "zustand";
import { Order, TTask, TaskStatus } from "../types";

type TasksStore = {
  tasks: TTask[];
  currentPage: number;
  tasksPerPage: number;
  addTask(task: TTask): void;
  editTask(updatedtask: TTask): void;
  deleteTask(id: string): void;
  filterByStatus: (status: TaskStatus) => void;
  sortByDescription: (order: Order) => void;
  resetFilters(): void;
  paginateTasks(): TTask[];
  getNextPage(): void;
  getPrevPage(): void;
};

export const useTasksStore = create<TasksStore>((set, get) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  currentPage: 1,
  tasksPerPage: 4,
  addTask(task) {
    const newTasks = [...get().tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    set({ tasks: newTasks });
  },
  editTask(updatedtask) {
    const updatedTasks = get().tasks.map((task) =>
      task.id === updatedtask.id ? updatedtask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    set({ tasks: [...updatedTasks] });
  },
  deleteTask(id) {
    const tasksAfterDeletion = get().tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasksAfterDeletion));
    set({ tasks: [...tasksAfterDeletion] });
  },

  filterByStatus(status) {
    set((state) => ({
      currentPage: 1,
      tasks: state.tasks.filter((task) => task.status === status),
    }));
  },
  sortByDescription(order) {
    set((state) => ({
      currentPage: 1,
      tasks: [...state.tasks].sort((a, b) =>
        order === "Ascending"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      ),
    }));
  },
  resetFilters() {
    set({ tasks: JSON.parse(localStorage.getItem("tasks") || "[]") });
  },
  paginateTasks() {
    const { tasks, currentPage, tasksPerPage } = get();
    const startIndex = (currentPage - 1) * tasksPerPage;
    return tasks.slice(startIndex, startIndex + tasksPerPage);
  },
  getNextPage() {
    set((state) => ({
      currentPage: Math.min(
        state.currentPage + 1,
        Math.ceil(state.tasks.length / state.tasksPerPage)
      ),
    }));
  },
  getPrevPage() {
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    }));
  },
}));
