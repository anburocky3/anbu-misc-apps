"use client";

import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ServicePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold ">Services</h1>
        <button
          type="button"
          className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          title="Logout user"
          onClick={handleLogout}
        >
          <LogOutIcon className="w-4 mr-3 inline-flex" />
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href={"/winrar"} className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            WinRAR License Generator
          </h2>
          <p className="text-gray-600">Generate licenses for WinRAR.</p>
        </Link>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">YTB Added</h2>
          <p className="text-gray-600">Coming soon.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">YTB Added</h2>
          <p className="text-gray-600">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}
