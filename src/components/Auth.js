import { useEffect, useState } from "react";

const Auth = ({ supabase, setAuth }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) setAuth(false);
    if (data.session !== null) setAuth(true);
  };

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError("Invalid login credentials");
      return;
    }
    setError("");
    setAuth(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmail(email, password);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white">
      <form className="space-y-6 " onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>

          <div className="mt-2">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Log in
          </button>
        </div>
        {error !== "" && (
          <label className="block text-sm font-medium leading-6 text-red-600">
            {error}
          </label>
        )}
      </form>
    </div>
  );
};

export default Auth;
