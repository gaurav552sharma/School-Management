"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/getSchools"); // We'll create this API
        const data = await res.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All Schools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {schools.map((school) => (
          <div key={school.id} className="card bg-base-100 w-80 shadow-md">
            <figure className="px-6 pt-6">
              <img
                src={school.image || "/placeholder.jpg"} // fallback if image missing
                alt={school.name}
                className="rounded-xl object-cover w-full h-48"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{school.name}</h2>
              <p className="text-sm text-gray-600">
                {school.address}, {school.city}, {school.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
