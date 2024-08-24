import { create } from "zustand";
import { Order, TTask, TaskStatus } from "../types";

type TasksStore = {
  tasks: TTask[];
  currentPage: number;
  tasksPerPage: number;
  isFiltersApplied: boolean;
  addTask(newTask: TTask): void;
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
  isFiltersApplied: false,
  addTask(newTask) {
    //add to local torage
    const localStorageNewTasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    ) as TTask[];
    const newTasks = [...localStorageNewTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    //add to state if allowed by filters
    const checkFilters = get().tasks.some(
      (task) => task.status == newTask.status
    );
    if (checkFilters) {
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    }
  },
  editTask(updatedtask) {
    //edit to local torage
    const updatedTasks = JSON.parse(localStorage.getItem("tasks") || "[]").map(
      (task: TTask) => (task.id === updatedtask.id ? updatedtask : task)
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    //add to state if allowed by filters
    const checkFilters = get().tasks.some(
      (task) => task.status == updatedtask.status
    );
    if (!get().isFiltersApplied || checkFilters) {
      set((state) => ({
        tasks: state.tasks.map((task: TTask) =>
          task.id === updatedtask.id ? updatedtask : task
        ),
      }));
    } else {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id != updatedtask.id),
      }));
    }
  },
  deleteTask(id) {
    //delete from local storage
    const localStorageAfterDeletion = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    ).filter((task: TTask) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(localStorageAfterDeletion));
    //delete from state
    const tasksAfterDeletion = get().tasks.filter((task) => task.id !== id);
    set({ tasks: [...tasksAfterDeletion] });
  },
  filterByStatus(status) {
    set((state) => ({
      isFiltersApplied: true,
      tasks: state.tasks.filter((task) => task.status === status),
    }));
  },
  sortByDescription(order) {
    set((state) => ({
      isFiltersApplied: true,
      tasks: [...state.tasks].sort((a, b) =>
        order === "Ascending"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      ),
    }));
  },
  resetFilters() {
    set({
      isFiltersApplied: false,
      currentPage: 1,
      tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    });
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
