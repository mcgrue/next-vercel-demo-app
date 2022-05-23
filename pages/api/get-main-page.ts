// import { NextApiRequest, NextApiResponse } from "next";

import { PingPawnFetch } from "../../lib/pingpawn_api";

export default async function handler(req, res) {
  try {
    const result = await PingPawnFetch(
      "https://api.pingpawn.com/quotes/recent",
      res
    );
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
