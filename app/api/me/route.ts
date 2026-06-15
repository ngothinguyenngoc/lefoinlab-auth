
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
          message:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token);

    return NextResponse.json({
      success: true,
      data: {
        userId: payload.userId,
        email: payload.email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid or expired token.",
      },
      {
        status: 401,
      }
    );
  }
}

