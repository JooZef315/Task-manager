import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TaskStatus, TTask } from "../types";
import { useTasksStore } from "../store/useTasksStore";
import { toast } from "react-toastify";
import { useState } from "react";

type PropsType = {
  task: TTask;
};

export default function Task({ task }: PropsType) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newSatus, setNewStatus] = useState<TaskStatus>();
  const [newTaskDesc, setNewTaskDesc] = useState<string>();

  const deleteTask = useTasksStore((state) => state.deleteTask);
  const editTask = useTasksStore((state) => state.editTask);

  const handleDeleting = () => {
    deleteTask(task.id);
    toast.error("Task deleted Successfully!");
  };

  const handleEditing = () => {
    editTask({
      id: task.id,
      description: newTaskDesc || task.description,
      status: newSatus || task.status,
    });
    setEditing(false);
    toast.success("Task updated Successfully!");
  };

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
        {!editing ? (
          <>
            {" "}
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
          <>
            <select
              className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
              defaultValue={task.status}
              onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
            >
              <option value="Not_Started">Not Started</option>
              <option value="In_Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <input
              type="text"
              name="desc"
              id="desc"
              className="flex-5 block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
              value={task.description}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
            <button
              type="button"
              onClick={handleEditing}
              className="ml-auto rounded-md border-0 py-2 px-6 text-center bg-blue-900 hover:bg-blue-950 text-white"
            >
              SAVE!
            </button>
          </>
        )}
      </div>
    </div>
  );
}
