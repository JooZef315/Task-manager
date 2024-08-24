import { useTasksStore } from "../store/useTasksStore";
import PaginationForm from "./paginationForm";
import Task from "./task";

export default function TasksList() {
  const currentTasks = useTasksStore((state) => state.paginateTasks());

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
