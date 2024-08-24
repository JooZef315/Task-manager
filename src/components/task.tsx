import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TaskStatus, TTask } from "../types";
import { useTasksStore } from "../store/useTasksStore";
import { toast } from "react-toastify";
import { useState } from "react";
import TaskEditingForm from "./taskEditingForm";

type PropsType = {
  task: TTask;
};

export default function Task({ task }: PropsType) {
  const [editing, setEditing] = useState<boolean>(false);

  const deleteTask = useTasksStore((state) => state.deleteTask);

  const handleDeleting = () => {
    deleteTask(task.id);
    toast.error("Task deleted Successfully!");
  };

  return (
    <div className="w-full fade-in content-center basis-1/2 p-4">
      <div
        className={`min-h-48 flex flex-col items-start justify-evenly px-4 py-1 bg-slate-100 shadow-md border-t-4 ${
          {
            [TaskStatus.Not_Started]: "border-red-500",
            [TaskStatus.In_Progress]: "border-blue-500",
            [TaskStatus.Finished]: "border-green-500",
          }[task.status]
        } transition-transform duration-300 hover:scale-110`}
      >
        {!editing ? (
          <>
            <span
              className={`${
                {
                  [TaskStatus.Not_Started]: "bg-red-500",
                  [TaskStatus.In_Progress]: "bg-blue-500",
                  [TaskStatus.Finished]: "bg-green-500",
                }[task.status]
              } text-white rounded-2xl py-1 px-3`}
            >
              {task.status}
            </span>
            <h2 className="font-semibold text-lg text-blue-900 pl-3">
              {task.description}
            </h2>
            <div className="flex self-end gap-1">
              <span>
                <FaEdit
                  onClick={() => setEditing(true)}
                  className="text-blue-900 hover:text-blue-950 cursor-pointer"
                  size={26}
                />
              </span>
              <span>
                <MdDelete
                  onClick={handleDeleting}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                  size={26}
                />
              </span>
            </div>
          </>
        ) : (
          <TaskEditingForm task={task} setEditing={setEditing} />
        )}
      </div>
    </div>
  );
}
