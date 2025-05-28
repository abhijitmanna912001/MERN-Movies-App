import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../app/api/users";
import { setCredentials } from "../../app/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row px-4 md:px-20 lg:px-40 py-8 items-start justify-between gap-8">
      <div className="w-full md:w-1/2">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
          Sign In
        </h1>

        <form onSubmit={submitHandler} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white-500 disabled:opacity-50"
          >
            {isLoading ? "Signing In ..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-2 text-sm sm:text-base text-white">
          <p className="flex flex-wrap items-center gap-3">
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-teal-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
          alt="Decorative"
          className="w-full max-w-md md:h-[26rem] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
