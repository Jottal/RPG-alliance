import type { NextApiRequest, NextApiResponse } from "next";
import { MastersService } from "@services/masters";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { DiscordUser } from "/types/discord-user";
import { Unauthorized } from "/types/unauthorized";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DiscordUser[] | Unauthorized>
) => {
  // TODO: Resolve ts error
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const masters = await MastersService.getMasters();
    res.status(200).json(masters);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
  res.end();
};

export default handler;
