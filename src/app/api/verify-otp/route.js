import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP required" },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    const isExpired = new Date(user.otp_expires_at) < new Date();

    if (user.otp !== otp || isExpired) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Clear OTP for security
    await conn.query(
      "UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE email = ?",
      [email]
    );

    // Issue JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in secure cookie
    const res = NextResponse.json({
      success: true,
      message: "Login successful",
    });
    res.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // available for all routes
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
