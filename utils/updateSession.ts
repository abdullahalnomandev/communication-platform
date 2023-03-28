import axios from "axios";
import Jwt from "jsonwebtoken";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  accountId: string;
  token?: string;
  update: () => Promise<void>;
}

export const updateSession = async (accountId: string) => {
  const session = await getSession();
  const accessToken = (session as CustomSession)?.token;

  if (!accessToken) {
    console.error("Access token not found in session");
    return;
  }

  // const decodedToken = await Jwt.decode(accessToken, process.env.JWT_SECRET as any);
  const decodedToken: any = Jwt.decode(accessToken, { complete: true })?.payload;
  console.log("decoded token", decodedToken);

  const updatedSession: any = { ...decodedToken, accountId };

  // const encodedToken = Jwt.sign(updateSession, process.env.NEXT_PUBLIC_JWT_SECRET_TOKEN as any, {
  //   algorithm: "HS256"
  // });
  const encoded = await axios.post("http://localhost:3000/api/jwt_update", updatedSession);
  console.log("ENCODE", encoded.data.token);

  if (session) {
    // Update the user session data
    (session as CustomSession).token = encoded.data.token;
    (session as CustomSession).accountId = accountId;
    await getSession({ update: true } as any);
  }
  // await getSession().then((session) => {
  //   // session.user.email = "hello";
  //   console.log("then", session);
  // });
  console.log(await getSession());
};
