import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://cookbackend-umfm.onrender.com/user/sign',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const resData = response.data;

      if (resData.token) {
        localStorage.setItem('token', resData.token);
        navigate('/login');
      }
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.errors) {
        // 🧠 Show each Zod error under the correct field
        errorData.errors.forEach((zodErr) => {
          setError(zodErr.path, {
            type: 'server',
            message: zodErr.message,
          });
        });
      } else {
        // 🧠 Generic backend error
        setError("email", {
          type: "server",
          message: errorData?.message || "Registration failed",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-5xl text-gray-900 font-bold mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
              className="w-full p-2 border rounded border-gray-950 text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded border-gray-950 text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              className="w-full p-2 border rounded border-gray-950 text-black"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-blue-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
