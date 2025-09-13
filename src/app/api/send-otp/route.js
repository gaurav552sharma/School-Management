import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import nodemailer from "nodemailer";

// create nodemailer transporter with SendGrid
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // connect to DB
    const conn = await getConnection();

    // check if user exists
    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      await conn.query(
        "UPDATE users SET otp = ?, otp_expires_at = ? WHERE email = ?",
        [otp, otpExpiresAt, email]
      );
    } else {
      await conn.query(
        "INSERT INTO users (email, otp, otp_expires_at) VALUES (?, ?, ?)",
        [email, otp, otpExpiresAt]
      );
    }

    // send email with OTP
    await transporter.sendMail({
      from: `"School App" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code for school-management",
      text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent!" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
