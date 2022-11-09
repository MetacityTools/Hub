import { useSession, signIn, signOut } from "next-auth/react"
import { Overview } from "../components/overview"

export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return <Overview email={session.user.email}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}