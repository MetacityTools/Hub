// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../../lib/roles'
import { authOptions } from "../auth/[...nextauth]"
import { filesToDirectory, initStorageDataset } from '../../../lib/storage'
import prisma from '../../../lib/prismadb'
import { Dataset } from '@prisma/client'
import formidable from 'formidable';


type Response = {
	error?: string;
	datasets?: Dataset[];
}


async function readDatasets(req: NextApiRequest, res: NextApiResponse<Response>) {
    //get cit from url
    const city = req.query.city as string;
    console.log(city);
    const datasets = await prisma.dataset.findMany({
        where: {
            city: {
                name: city
            }
        }
    });
    return res.status(200).json({ datasets });
}



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const session = await unstable_getServerSession(req, res, authOptions)

	//check user permisions
	if (!checkRole(session, "admin"))
		return res.status(401).json({ error: "Unauthorized" });
        
    if (req.method === 'GET') { 
        return await readDatasets(req, res);
	}
}