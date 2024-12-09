"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-[90vh] w-full flex justify-center items-center flex-col">
        {verified ? (
          <div className="flex flex-col gap-4 p-6 rounded-lg text-white shadow-[0_0_10px_black] ">
            <h1 className="text-3xl text-center font-bold">
              Email verified successfully
            </h1>
            <Link
              href="/login"
              className="w-1/2 mx-auto py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300 "
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
            <h1 className="text-3xl text-center font-bold">
              Verifying email...
            </h1>
          </div>
        )}
        {error && (
          <div className="flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
            <h1 className="text-3xl text-center font-bold text-red-500">
              Invalid or expired token
            </h1>
            <Link
              href="/signup"
              className="w-1/2 mx-auto py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300 "
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
