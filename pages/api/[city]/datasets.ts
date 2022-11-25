// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../../lib/roles'
import { authOptions } from "../auth/[...nextauth]"
import { Storage } from '../../../lib/storage'
import { Dataset } from '@prisma/client'


type Response = {
	error?: string;
	datasets?: Dataset[];
}


async function readDatasets(req: NextApiRequest, res: NextApiResponse<Response>) {
    const city = req.query.city as string;
    const storage = new Storage();
    const datasets = await storage.getDatasets(city);
    return res.status(200).json({ datasets });
}


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const session = await unstable_getServerSession(req, res, authOptions)
	if (!checkRole(session, "admin"))
		return res.status(401).json({ error: "Unauthorized" });
        
    if (req.method === 'GET') { 
        return await readDatasets(req, res);
	}
}