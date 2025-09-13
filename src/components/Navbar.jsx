"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, Home } from "lucide-react";
import { isLoggedIn } from "@/utils/auth"; // adjust path if needed
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-blue-500 p-4 flex justify-between items-center shadow-md">
      {/* Home Button */}
      <button
        onClick={() => router.push("/")}
        className="btn btn-ghost rounded flex items-center gap-2 text-white"
      >
        <Home size={20} />
        Home
      </button>

      {/* Auth Button */}
      {!loggedIn ? (
        <button
          onClick={() => router.push("/login")}
          className="btn btn-outline rounded text-white "
        >
          <LogIn size={18} />
          Login
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="btn btn-outline rounded text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}
    </nav>
  );
}
