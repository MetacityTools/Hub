// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../lib/roles'
import { authOptions } from "./auth/[...nextauth]"

type Response = {
	error?: string;
    users?: User[];
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
        //not much
	} else if (req.method === 'PUT') {
		// update a user
	} else if (req.method === 'DELETE') {
		// delete a user
	} else {
		// get all users
        const users = await prisma?.user.findMany();

        if (!users) {
            return res.status(500).json({ error: "Internal Server Error - Prisma Client Error" });
        }

        res.json({ users });
	}

	res.status(200);
}
