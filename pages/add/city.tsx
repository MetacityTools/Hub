import { useSession, signIn } from "next-auth/react"
import { AddCity } from "../../components/pages/addCity"


export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return <AddCity email={session.user.email}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}