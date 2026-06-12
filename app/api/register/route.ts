import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: Request) {

  const { email, password } = await req.json();
  const passwordHash = await hashPassword(password);
const existingUser = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (existingUser) {
  return NextResponse.json(
    {
      success: false,
      message: "Email already exists",
    },
    {
      status: 409,
    }
  );
}
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

  return NextResponse.json({
    success: true,
    email,
    passwordHash,
  });

}