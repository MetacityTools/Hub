// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../lib/roles'
import { authOptions } from "./auth/[...nextauth]"
import { initStorageCity } from '../../lib/storage'
import prisma from '../../lib/prismadb'
import { City } from '@prisma/client'

type Response = {
	error?: string;
	cities?: City[];
}


async function createCity(req: NextApiRequest, res: NextApiResponse<Response>) {
	const city = req.body.city;
	const cityExists = await prisma.city.findFirst({
		where: {
			name: city
		}
	});

	let path;
	if(cityExists || !(path = initStorageCity(city))) 
		return res.status(500).json({ error: "City already exists" });
	
	await prisma.city.create({
		data: {
			name: city,
			storage: path
		}
	});

	return res.status(200).json({});
}

async function readCities(res: NextApiResponse<Response>) {
	const cities = await prisma.city.findMany();
	return res.status(200).json({ cities });
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
		return await createCity(req, res);
	} else if (req.method === 'PUT') {
		// update a city
	} else if (req.method === 'DELETE') {
		// delete a city
	} else { 
		return await readCities(res);
	}
}
