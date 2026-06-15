
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET =
  process.env.JWT_SECRET ||
  "lefoinlab-development-secret";

export interface LeFoinJwtPayload
  extends JwtPayload {
  userId: string;
  email: string;
}

export function signToken(
  payload: LeFoinJwtPayload
) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(
  token: string
): LeFoinJwtPayload {
  return jwt.verify(
    token,
    SECRET
  ) as LeFoinJwtPayload;
}

