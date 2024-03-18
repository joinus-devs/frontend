// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { naverToken } = req.query;
  const response = await fetch(
    `
  https://openapi.naver.com/v1/nid/me
  `,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${naverToken}` },
    }
  ).then((res) => res.json());
  const result = await response.response;
  res.status(200).json(result);
}
