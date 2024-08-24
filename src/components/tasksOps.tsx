import { FormEvent, useState } from "react";
import { Order, TaskStatus } from "../types";
import { useTasksStore } from "../store/useTasksStore";
import { toast } from "react-toastify";

export default function TasksOps() {
  const [filterStatus, setFilterStatus] = useState<
    TaskStatus | "Filter by task status"
  >("Filter by task status");
  const [order, setOrder] = useState<Order | "Sort by description">(
    "Sort by description"
  );

  const filterByStatus = useTasksStore((state) => state.filterByStatus);
  const sortByDescription = useTasksStore((state) => state.sortByDescription);
  const resetFilters = useTasksStore((state) => state.resetFilters);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFilters();
    console.log(filterStatus, order);
    if (filterStatus !== "Filter by task status") {
      filterByStatus(filterStatus);
    }
    if (order !== "Sort by description") {
      sortByDescription(order);
    }
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFilters();
    setFilterStatus("Filter by task status");
    setOrder("Sort by description");
    toast.info("All filters are now Resetted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="bg-slate-200 shadow-md w-full flex flex-col gap-2 md:flex-row md:gap-4 items-center p-3 rounded-md mt-4"
    >
      <select
        className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as TaskStatus)}
      >
        <option
          value="Filter by task status"
          disabled
          className="text-gray-400"
        >
          Filter by task status
        </option>
        <option value="Not_Started">Not Started</option>
        <option value="In_Progress">In Progress</option>
        <option value="Finished">Finished</option>
      </select>
      <select
        className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
        value={order}
        onChange={(e) => setOrder(e.target.value as Order)}
      >
        <option value="Sort by description" disabled className="text-gray-400">
          Sort by description
        </option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
      <button
        type="submit"
        className="flex-1 w-full rounded-md border-0 py-2 px-6 text-center bg-blue-900 hover:bg-blue-950 text-white"
      >
        APPLY!
      </button>
      <button
        type="reset"
        disabled={
          order == "Sort by description" &&
          filterStatus == "Filter by task status"
        }
        className="flex-1 w-full rounded-md border-0 py-2 px-6 text-center bg-zinc-500 hover:bg-zinc-600 text-white disabled:bg-zinc-300"
      >
        RESET!
      </button>
    </form>
  );
}
