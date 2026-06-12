import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: Request) {

  const { email, password } = await req.json();
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
  data: {
    email,
    passwordHash,
  },
});
const profile = await prisma.profile.create({
  data: {
    userId: user.id,
    displayName: email.split("@")[0],
  },
});
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
  user: {
    id: user.id,
    email: user.email,
  },
  profile: {
    displayName: profile.displayName,
  },
});

}