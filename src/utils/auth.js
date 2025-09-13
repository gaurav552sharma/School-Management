"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function isLoggedIn() {
  const token = Cookies.get("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    // JWT expiry check (exp is in seconds)
    if (decoded.exp * 1000 < Date.now()) {
      return false; // token expired
    }
    return true; // token exists and is valid
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // invalid token
  }
}
