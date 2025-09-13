"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Geist } from "next/font/google";

const geistFont = Geist({ subsets: ["latin"], weight: ["400", "700"] });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email → otp
  const [sending, setSending] = useState(false); // loading state

  // Step 1: Request OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("📩 OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong while sending OTP!");
    } finally {
      setSending(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Logged in successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(data.error || "Invalid or expired OTP");
      }
    } catch (err) {
      toast.error("Something went wrong while verifying OTP!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card w-96 bg-base-100 shadow-xl p-6 rounded-xl">
        <h2
          className={`text-3xl font-bold text-center mb-6 ${geistFont.className}`}
        >
          Login with OTP
        </h2>

        {/* Step 1: Enter Email */}
        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="btn btn-primary btn-rounded w-full border-2"
              disabled={sending} // disable while sending
            >
              {sending ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="input input-bordered w-full mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="btn btn-success btn-rounded w-full"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
