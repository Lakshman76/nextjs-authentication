"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const onReset = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", {
        newPassword: password,
        token,
      });
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-[90vh] w-full flex justify-center items-center flex-col">
        <div className="max-w-md min-w-96 flex flex-col gap-8 p-6 rounded-lg text-white shadow-[0_0_10px_black] ">
          {loading ? (
            <p className="text-center text-xl font-semibold ">
              Please wait Loading...
            </p>
          ) : (
            <p className="text-center text-xl font-semibold">
              Reset your password
            </p>
          )}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Enter new password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
              required
            />
          </div>
          <button
            onClick={onReset}
            className="w-full mx-auto py-2 text-xl text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
