import { useState } from "react";
import { useTasksStore } from "../store/useTasksStore";
import { TaskStatus, TTask } from "../types";
import { toast } from "react-toastify";

type PropsType = {
  task: TTask;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskEditingForm({ task, setEditing }: PropsType) {
  const [newSatus, setNewStatus] = useState<TaskStatus>(task.status);
  const [newTaskDesc, setNewTaskDesc] = useState<string>(task.description);

  const editTask = useTasksStore((state) => state.editTask);

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
    <div className="w-full flex flex-col items-center gap-3 px-3">
      <select
        className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
        defaultValue={newSatus}
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
        value={newTaskDesc}
        onChange={(e) => setNewTaskDesc(e.target.value)}
      />
      <button
        type="button"
        onClick={handleEditing}
        className="ml-auto rounded-md border-0 py-2 px-6 text-center bg-blue-900 hover:bg-blue-950 text-white"
      >
        SAVE!
      </button>
    </div>
  );
}
