import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { DatasetOverview } from "../../components/pages/datasetOverview";


export default function Index() {
	const { data: session } = useSession();
	const router = useRouter();
	const { city } = router.query;

	if (session && session.user && session.user.email) {
		return <DatasetOverview email={session.user.email} city={city as string}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}