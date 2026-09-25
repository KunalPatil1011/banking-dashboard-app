// import { useState, type FormEvent } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../app/store";
// import { login } from "../authSlice";
// interface LocationState {
//   from?: {
//     pathname?: string;
//   };
// }
// function LoginPage() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const locationState = location.state as LocationState | null;
//   const redirectPath = locationState?.from?.pathname ?? "/dashboard";
//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!email.trim()) {
//       setError("Please enter your email.");
//       return;
//     }
//     if (!password.trim()) {
//       setError("Please enter your password.");
//       return;
//     }
//     setError("");
//     dispatch(login(email.trim()));
//     navigate(redirectPath, {
//       replace: true,
//     });
//   };
//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
//       <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
//             FP
//           </div>
//           <h1 className="text-3xl font-bold text-slate-900">File Portal</h1>
//           <p className="mt-2 text-sm text-slate-500">
//             Login to view the files dashboard
//           </p>
//         </div>
//         {error && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-slate-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               placeholder="Enter your email"
//               autoComplete="email"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-slate-700"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               placeholder="Enter your password"
//               autoComplete="current-password"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-6 text-center text-xs text-slate-400">
//           Enter any email and password for this demo.
//         </p>
//       </section>
//     </main>
//   );
// }
// export default LoginPage;

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearAuthError, loginUser } from "../authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth,
  );

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password,
      }),
    );
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-100
      flex
      items-center
      justify-center
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-slate-200
        p-10
        "
      >
        {/* Header */}

        <div className="text-center">
          {/* <div
            className="
            w-16
            h-16
            mx-auto
            rounded-2xl
            bg-[#006D6F]
            flex
            items-center
            justify-center
            text-white
            text-2xl
            font-bold
            "
          >
            GE Vernova
          </div> */}

          <h1
            className="
            mt-6
            text-3xl
            font-bold
            text-slate-900
            "
          >
            GE Vernova
          </h1>

          {/* <p
            className="
            mt-2
            text-sm
            text-slate-500
            "
          >
            Sign in to access your banking dashboard
          </p> */}
        </div>

        {/* Error */}

        {error && (
          <div
            className="
            mt-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-3
            text-sm
            text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
              text-left
              "
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none

              focus:border-[#17847E]
              focus:ring-4
              focus:ring-[#17847E]/10

              transition
              "
            />
          </div>

          {/* Password */}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="
                block
                text-sm
                font-medium
                text-slate-700
                "
              >
                Password
              </label>

              {/* <Link
                to="/forgot-password"
                className="
                text-sm
                text-[#17847E]
                hover:underline
                "
              >
                Forgot Password?
              </Link> */}
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none

              focus:border-[#17847E]
              focus:ring-4
              focus:ring-[#17847E]/10

              transition
              "
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={isLoading}
            className="
            w-full
            rounded-xl
            bg-[#006D6F]
            py-3
            text-white
            font-semibold

            hover:bg-[#17847E]

            transition

            disabled:opacity-50
            disabled:cursor-not-allowed
            "
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}

        <div
          className="
          mt-8
          border-t
          border-slate-200
          pt-6
          text-center
          "
        >
          {/* <p className="text-sm text-slate-500">Banking Portal © 2026</p>

          <p className="mt-2 text-xs text-slate-400">
            Secure Banking • Redux Toolkit • React 19
          </p> */}
        </div>
      </div>
    </div>
  );
}
