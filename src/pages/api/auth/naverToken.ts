// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { naverCode, naverState } = req.query;
  const naverToken = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&code=${naverCode}&state=${naverState}`;
  const response = await fetch(naverToken);
  const result = await response.json();
  res.status(200).json(result);
}
