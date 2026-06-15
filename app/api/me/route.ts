
import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export async function GET(
  req: NextRequest
) {
  try {
    const token =
      req.cookies.get(
        "lefoin_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated.",
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token);

    return NextResponse.json(
      {
        success: true,
        message: "Authenticated.",
        data: {
          userId: payload.userId,
          email: payload.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid or expired token.",
        data: null,
      },
      {
        status: 401,
      }
    );
  }
}

