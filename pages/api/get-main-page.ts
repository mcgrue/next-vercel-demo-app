import { NextApiRequest, NextApiResponse } from "next";

const apicall = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://api.pingpawn.com/quotes/recent", {});

  res.status(200).json(response.text());
};

export default apicall;
