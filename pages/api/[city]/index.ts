// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../../lib/roles'
import { authOptions } from "../auth/[...nextauth]"
import { Storage } from '../../../lib/storage'
import { Dataset } from '@prisma/client'
import formidable from 'formidable';
import { MicroservicesAPI } from '../../../lib/micoapi'


type Response = {
	error?: string;
	datasets?: Dataset[];
}


function parseFormData(req: NextApiRequest) : Promise<{fields: any, files: any}> {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            if (!(files.files instanceof Array))
                files.files = [files.files];

            resolve({ fields, files: files.files });
        });
    });
}


async function createDataset(req: NextApiRequest, res: NextApiResponse<Response>) {
    const { fields, files } = await parseFormData(req);

    if (!files.length)
        return res.status(400).json({ error: "No files" });

    const city = req.query.city as string;    
    const dataset = fields.dataset;
    const storage = new Storage();
    const dataset_ = await storage.addDataset(city, dataset, files);

    if (!dataset_)
        return res.status(400).json({ error: "Dataset already exists" });

    //TODO process dataset
    let services = new MicroservicesAPI();
    await services.processDataset();

    return res.status(200).json({});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const session = await unstable_getServerSession(req, res, authOptions)
	if (!checkRole(session, "admin"))
		return res.status(401).json({ error: "Unauthorized" });
        
    if (req.method === 'POST') {
        return createDataset(req, res);
	} else if (req.method === 'PUT') {
		// update a dataset
	} else if (req.method === 'DELETE') {
		// delete a dataset
	}
}

export const config = {
    api: {
        bodyParser: false
    }
}