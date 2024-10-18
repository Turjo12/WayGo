'use client'; // Ensures this component is rendered client-side

import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useRouter } from "next/navigation"; // Correct import for client-side navigation in Next.js 13+

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter(); // Correct hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/"); // Use router.push for client-side navigation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#25527E]">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold text-white rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-800 duration-700"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
