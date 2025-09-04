"use client";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="fixed top-4 left-4 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
      title="Go to Home"
    >
      <Home size={24} />
    </button>
  );
}
