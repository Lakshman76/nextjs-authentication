"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-[90vh] flex justify-center items-center ">
      <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
        <Image
          src="/profile.png"
          alt="user profile"
          width={150}
          height={200}
          className="m-auto rounded-full"
        />
        <h3 className="text-xl font-semibold text-center capitalize">
          Maharani Jhashi
        </h3>
        <div>
          <div className="flex justify-between items-center gap-2">
            <p>Email: </p> <p>email@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Link
            href="#"
            className="w-1/2 py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            Change Password
          </Link>
          <Link
            href="#"
            className="w-1/2 py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            Edit Profile
          </Link>
        </div>
        <button
          onClick={logout}
          className="w-full h-12 text-center rounded-sm font-semibold  cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500 transition-all ease-in-out duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
