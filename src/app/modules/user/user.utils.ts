import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; phone: string; role: string; userId: string },
  secret: string,
  expiresIn: string
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
