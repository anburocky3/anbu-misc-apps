"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (data.success) {
      router.replace("/services");
    } else {
      alert(data.message || "Incorrect password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="p-6 bg-white max-w-xl rounded-lg shadow-md">
        <div className=" mb-4">
          <h1 className="text-2xl font-bold">Anbu&apos;s Space</h1>
          <p className="text-sm text-gray-600">Enter password to enter.</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
          placeholder="Password"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 uppercase font-semibold"
        >
          <LogIn className="w-4 inline-flex mr-2" />
          Login
        </button>
      </div>
    </div>
  );
}
