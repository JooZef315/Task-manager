import { useTasksStore } from "../store/useTasksStore";
import Task from "./task";

export default function TasksList() {
  const tasks = useTasksStore((state) => state.tasks);
  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}
