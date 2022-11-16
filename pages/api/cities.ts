// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../lib/roles'
import { authOptions } from "./auth/[...nextauth]"

type Response = {
	error?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const session = await unstable_getServerSession(req, res, authOptions)

	//check user permisions
	if (!checkRole(session, "admin"))
		return res.status(401).json({ error: "Unauthorized" });

	if (req.method === 'POST') {
		// create a new city
	} else if (req.method === 'PUT') {
		// update a city
	} else if (req.method === 'DELETE') {
		// delete a city
	} else {
		// get a city
	}


	res.status(200);
}
