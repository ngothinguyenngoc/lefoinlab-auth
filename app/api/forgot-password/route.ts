
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
    const { email } = await req.json();

    if (
      !email ||
      typeof email !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Sprint 1:
     *
     * TODO:
     * 1. Find user by email
     * 2. Generate reset token
     * 3. Save token to database
     * 4. Send reset email
     */

    return NextResponse.json({
      success: true,
      message:
        "If the email exists, a password reset link will be sent.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}

