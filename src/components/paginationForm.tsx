import { useTasksStore } from "../store/useTasksStore";

export default function PaginationForm() {
  const tasks = useTasksStore((state) => state.tasks);
  const currentPage = useTasksStore((state) => state.currentPage);
  const tasksPerPage = useTasksStore((state) => state.tasksPerPage);
  const getNextPage = useTasksStore((state) => state.getNextPage);
  const getPrevPage = useTasksStore((state) => state.getPrevPage);

  return (
    <div className="w-full flex justify-center items-center my-6">
      <button
        onClick={getPrevPage}
        disabled={currentPage === 1}
        className="text-sm rounded-md border-0 py-2 px-6 text-center bg-zinc-500 hover:bg-zinc-600 text-white disabled:bg-zinc-300"
      >
        Previous
      </button>
      <span className="text-blue-900 mx-4">{`Page ${currentPage}`}</span>
      <button
        onClick={getNextPage}
        disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
        className="text-sm rounded-md border-0 py-2 px-6 text-center bg-zinc-500 hover:bg-zinc-600 text-white disabled:bg-zinc-300"
      >
        Next
      </button>
    </div>
  );
}
