import { FormEvent, useState } from "react";

type PropsType = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setIsLoggedIn }: PropsType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username / Password can't be empty!");
      setLoading(false);
      return;
    }

    if (
      username != import.meta.env.VITE_USERNAME ||
      password != import.meta.env.VITE_PASSWORD
    ) {
      setError("Username or Password are not correct!");
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
    setLoading(false);
  };

  return (
    <main className="h-4/5 my-auto flex justify-center items-center">
      {loading ? (
        <p className="text-center text-zinc-500 p-3">
          Loading, Please Wait ...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="min-w-96 bg-gray-100 flex flex-col justify-center items-center gap-5 py-12 px-10 shadow-xl"
        >
          {error && (
            <p className="w-full bg-red-800 text-white p-2 text-center text-xs my-1">
              {error}
            </p>
          )}
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              className="w-full py-3 px-5 text-gray-500 border-none"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full py-3 px-5 bg-blue-900 hover:bg-blue-700 text-white"
            >
              LOGIN
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
