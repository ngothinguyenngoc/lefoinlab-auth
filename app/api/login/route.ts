import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "Email and password are required",
      },
      {
        status: 400,
      }
    );
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // User not found
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
      },
      {
        status: 401,
      }
    );
  }
  const isValidPassword = await verifyPassword(
  password,
  user.passwordHash
);

if (!isValidPassword) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid email or password",
    },
    {
      status: 401,
    }
  );
}

  // User exists
  const token = signToken({
  userId: user.id,
  email: user.email,
});

  const response = NextResponse.json({
  success: true,
  message: "Login successful",
});

response.cookies.set({
  name: "lefoin_token",
  value: token,
  httpOnly: true,
  sameSite: "lax",
  secure: false, // local dev
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

return response;
}