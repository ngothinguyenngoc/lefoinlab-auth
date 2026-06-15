
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      callback,
    } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const isValidPassword =
      await verifyPassword(
        password,
        user.passwordHash
      );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    const redirect =
      callback ||
      "https://lefoinlab.com";

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login successful.",
        data: {
          userId: user.id,
          email: user.email,
        },
        redirect,
      });

    response.cookies.set({
      name: "lefoin_token",
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}

