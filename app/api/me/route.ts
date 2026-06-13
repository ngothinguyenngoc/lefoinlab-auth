import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {

  const token =
    req.cookies.get("lefoin_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  try {

    const payload = verifyToken(token);

    return NextResponse.json({
      success: true,
      payload,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );

  }

}