"use client";
import axios from "axios";
import React from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSend = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setIsSent(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-[90vh] w-full flex justify-center items-center flex-col">
        {isSent ? (
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl text-center font-bold">
              Password reset link sent to {email}
            </h1>
            <p className="text-center text-xl font-semibold text-yellow-200">
              Please check your inbox ✉️
            </p>
          </div>
        ) : (
          <div className="max-w-md min-w-96 flex flex-col gap-8 p-6 rounded-lg text-white shadow-[0_0_10px_black] ">
            {loading ? (
              <p className="text-center text-xl font-semibold ">
                Please wait Loading...
              </p>
            ) : (
              <h1 className="text-3xl text-center font-bold">
                please provide your email
              </h1>
            )}

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
              placeholder="name@company.com"
              required
            />
            <button
              onClick={onSend}
              className="w-full mx-auto py-2 text-xl text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
            >
              send
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
