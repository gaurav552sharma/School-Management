"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    for (let key in data) {
      if (key !== "image") {
        // skip image here
        formData.append(key, data[key]);
      }
    }
    formData.append("image", data.image[0]); // only append actual file

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("School added successfully!");
      reset();
    } else {
      setMessage(result.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-xl bg-white shadow-xl border border-gray-200 rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add School Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* School Name */}
          <div className="form-control">
            <label className="label font-semibold">School Name</label>
            <input
              type="text"
              placeholder="Enter school name"
              className="input input-bordered w-full"
              {...register("name", { required: "School name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label font-semibold">Address</label>
            <textarea
              placeholder="Enter address"
              className="textarea textarea-bordered w-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            {/* City */}
            <div className="form-control flex-1">
              <label className="label font-semibold">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="input input-bordered w-full"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div className="form-control flex-1">
              <label className="label font-semibold">State</label>
              <input
                type="text"
                placeholder="Enter state"
                className="input input-bordered w-full"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="form-control">
            <label className="label font-semibold">Contact Number</label>
            <input
              type="number"
              placeholder="10-digit number"
              className="input input-bordered w-full"
              {...register("contact", {
                required: "Contact number is required",
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" },
              })}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter school email"
              className="input input-bordered w-full"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm">{errors.email_id.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="form-control">
            <label className="label font-semibold">School Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
