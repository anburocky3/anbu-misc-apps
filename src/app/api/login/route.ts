import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Replace this with your actual hashed password
    const correctPasswordHash = process.env.PASSWORD_HASH;

    if (!correctPasswordHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Server error: Password hash not configured",
        },
        { status: 500 }
      );
    }

    // Compare the provided password with the hashed password
    const isMatch = bcrypt.compareSync(password, correctPasswordHash);

    if (isMatch) {
      const cookieStore = await cookies();

      cookieStore.set("isAuthenticated", "true", {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
        maxAge: 60 * 60 * 24, // 1 day (in seconds)
        path: "/", // Make the cookie accessible across all routes
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in login API route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
