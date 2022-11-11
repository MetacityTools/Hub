import { useSession, signIn } from "next-auth/react"
import { CityOverview } from "../../components/pages/cityOverview"

export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return <CityOverview email={session.user.email}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}