import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TaskStatus, TTask } from "../types";

type PropsType = {
  task: TTask;
};

export default function Task({ task }: PropsType) {
  return (
    <div className="fade-in content-center sm:basis-1/2 p-4">
      <div
        className={`min-h-48 flex flex-col items-start justify-evenly px-4 py-1 bg-slate-100 shadow-md  border-t-4 border-${
          task.status == TaskStatus.Not_Started
            ? "red"
            : task.status == TaskStatus.In_Progress
            ? "blue"
            : "green"
        }-500 transition-transform duration-300 hover:scale-110`}
      >
        <span
          className={`bg-${
            task.status == TaskStatus.Not_Started
              ? "red"
              : task.status == TaskStatus.In_Progress
              ? "blue"
              : "green"
          }-500 text-white rounded-2xl py-1 px-3`}
        >
          {task.status}
        </span>
        <h2 className="font-semibold text-lg text-blue-900 pl-3">
          {task.description}
        </h2>
        <div className="flex self-end gap-1">
          <span>
            <FaEdit
              className="text-blue-900 hover:text-blue-950 cursor-pointer"
              size={26}
            />
          </span>
          <span>
            <MdDelete
              className="text-red-600 hover:text-red-700 cursor-pointer"
              size={26}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
