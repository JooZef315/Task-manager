import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTasksStore } from "../store/useTasksStore";
import { TTask, TaskStatus } from "../types";

export default function AddTask() {
  const [taskDesc, setTaskDesc] = useState<string>("");
  const addTask = useTasksStore((state) => state.addTask);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskDesc.trim()) {
      toast.error("Task description can't be empty!");
      return;
    }

    const newTask: TTask = {
      id: uuidv4(),
      description: taskDesc.trim(),
      status: TaskStatus.Not_Started,
    };

    addTask(newTask);
    setTaskDesc("");
    toast.success("Task was added Successfully!");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-200 shadow-md w-full flex flex-col gap-2 md:flex-row md:gap-4 items-center p-3 rounded-md mt-4"
    >
      <input
        type="text"
        name="desc"
        id="desc"
        placeholder="Add a Task .."
        className="flex-5 block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
      />
      <button
        type="submit"
        className="flex-1 w-full rounded-md border-0 py-2 px-6 text-center bg-blue-900 hover:bg-blue-950 text-white"
      >
        ADD!
      </button>
    </form>
  );
}
