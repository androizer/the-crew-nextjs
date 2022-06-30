import { NextApiRequest, NextApiResponse } from "next";

import { axiosInstance } from "../../../../core/services";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type LoginRequestDTO = {
  email: string;
  firstName: string;
  lastName: string;
  meta: Record<string, any>;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axiosInstance.getInstance().post<LoginResponse>(
    `/auth/login/google`,
    JSON.parse(req.body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data.accessToken && data.refreshToken) {
    res.send(data);
    return;
  }
  res.status(401);
};
