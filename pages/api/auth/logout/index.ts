import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { axiosInstance } from "../../../../core/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const { data, status } = await axiosInstance.getInstance().get("auth/logout", {
    headers: {
      ...(token?.accessToken
        ? { Authorization: `Bearer ${token.accessToken}` }
        : null),
    },
  });
  res.status(status).send(data);
}
