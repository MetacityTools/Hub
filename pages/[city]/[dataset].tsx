import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'


export default function Dataset() {
	const router = useRouter();
	const { city, dataset } = router.query;

	return (dataset);
}