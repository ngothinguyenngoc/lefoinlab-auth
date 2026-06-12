import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/bcrypt";

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
  return NextResponse.json({
  success: true,
  message: "Login successful",
  user: {
    id: user.id,
    email: user.email,
  },
});
}