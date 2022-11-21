// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { checkRole } from '../../lib/roles'
import { authOptions } from "./auth/[...nextauth]"
import { initStorageDir, storageDirExists } from '../../lib/storage'
import prisma from '../../lib/prismadb'
import { City } from '@prisma/client'

type Response = {
	error?: string;
	cities?: City[];
}


async function createCity(city: string) {
	const cityExists = await prisma.city.findFirst({
		where: {
			name: city
		}
	});

	let path;
	if(cityExists || !(path = initStorageDir(city))) 
		return { error: "City already exists" };
	
	await prisma.city.create({
		data: {
			name: city,
			storage: path
		}
	});

	return {};
}

function readCities() {
	return prisma.city.findMany();
}


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const session = await unstable_getServerSession(req, res, authOptions)

	//check user permisions
	if (!checkRole(session, "admin"))
		return res.status(401).json({ error: "Unauthorized" });

	const city = req.body.city;

	if (req.method === 'POST') {
		const message = await createCity(city);
		if(message.error)
			return res.status(500).json(message);
		return res.status(200).json({});
	} else if (req.method === 'PUT') {
		// update a city
	} else if (req.method === 'DELETE') {
		// delete a city
	} else { 
		const cities = await readCities();
		return res.status(200).json({cities: cities});
	}
}
