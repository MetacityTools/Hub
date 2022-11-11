import { useSession, signIn } from "next-auth/react"
import { CityList } from "../../components/pages/cityList"

export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return <CityList email={session.user.email}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}