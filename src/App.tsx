import { useState } from "react";
import Navbar from "./components/navbar";
import { Task } from "./types";
import Login from "./components/login";
import AddTask from "./components/addTask";
import TasksList from "./components/tasksList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Task>();
  const [tasks, settasks] = useState<Task[]>([]);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-116px)] flex flex-col justify-center items-center gap-4 w-full md:w-3/4 md:mx-auto">
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            <AddTask />
            <TasksList />
          </>
        )}
      </main>
    </>
  );
}
export default App;
