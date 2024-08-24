/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useTasksStore } from "../store/useTasksStore";
import PaginationForm from "./paginationForm";
import Task from "./task";

export default function TasksList() {
  const currentTasks = useMemo(() => {
    return useTasksStore.getState().paginateTasks();
  }, [
    useTasksStore((state) => state.tasks),
    useTasksStore((state) => state.currentPage),
  ]);
  // const currentTasks = useTasksStore((state) => state.paginateTasks());
  const currentPage = useTasksStore((state) => state.currentPage);
  const getPrevPage = useTasksStore((state) => state.getPrevPage);

  useEffect(() => {
    if (!currentTasks.length && currentPage !== 1) {
      getPrevPage();
    }
  }, [currentTasks]);

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {!currentTasks.length ? (
        <h1 className="italic text-center text-lg mt-3 text-zinc-500">
          No Tasks For Now.
        </h1>
      ) : (
        <>
          {currentTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
          <PaginationForm />
        </>
      )}
    </div>
  );
}
