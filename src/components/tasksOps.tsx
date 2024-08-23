import { FormEvent, useState } from "react";
import { TaskStatus } from "../types";

type Order = "Ascending" | "Descending";

export default function TasksOps() {
  const [status, setStatus] = useState<TaskStatus>();
  const [order, setOrder] = useState<Order>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="bg-slate-200 shadow-md w-full flex flex-col gap-2 md:flex-row md:gap-4 items-center p-3 rounded-md mt-4"
    >
      <select
        className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="" disabled selected className="text-gray-400">
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
        <option value="" disabled selected className="text-gray-400">
          Sort by task description
        </option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
      <button
        type="submit"
        className="flex-1 w-full rounded-md border-0 py-2 px-6 text-center bg-blue-900 hover:bg-blue-700 text-white"
      >
        APPLY!
      </button>
      <button
        type="reset"
        className="flex-1 w-full rounded-md border-0 py-2 px-6 text-center bg-zinc-500 hover:bg-zinc-600 text-white disabled:bg-zinc-300"
      >
        RESET!
      </button>
    </form>
  );
}
