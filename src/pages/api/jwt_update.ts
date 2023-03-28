import Jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const encoded = Jwt.sign(req.body, process.env.NEXT_PUBLIC_JWT_SECRET_TOKEN as string, { algorithm: "HS256" }) as any;
  const encodedToken = Jwt.sign(req.body, process.env.JWT_SECRET as string, {
    algorithm: "HS256"
  });

  res.status(200).json({
    status: "success",
    token: encodedToken
  } as any);
}
