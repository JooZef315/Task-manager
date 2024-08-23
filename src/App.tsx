import { useState } from "react";
import Navbar from "./components/navbar";
import Login from "./components/login";
import AddTask from "./components/addTask";
import TasksList from "./components/tasksList";
import TasksOps from "./components/tasksOps";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-116px)] flex flex-col items-center gap-4 p-4 w-full md:w-3/4 md:mx-auto">
        {isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            <AddTask />
            <TasksOps />
            <TasksList />
          </>
        )}
      </main>
    </>
  );
}
export default App;
