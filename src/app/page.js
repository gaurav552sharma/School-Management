"use client";
import { useRouter } from "next/navigation";
import { PlusCircle, Eye } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center">School Management</h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-10 text-center">
        Manage schools easily — add new schools or view existing ones
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Add School */}
        <button
          onClick={() => router.push("/addSchool")}
          className="btn btn-primary btn-lg flex items-center justify-center gap-2 w-64 transform transition duration-200 hover:scale-105"
        >
          <PlusCircle size={24} />
          Add School
        </button>

        {/* View Schools */}
        <button
          onClick={() => router.push("/showSchools")}
          className="btn btn-secondary btn-lg flex items-center justify-center gap-2 w-64 transform transition duration-200 hover:scale-105"
        >
          <Eye size={24} />
          View Schools
        </button>
      </div>
    </div>
  );
}
