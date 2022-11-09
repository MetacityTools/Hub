import { useSession, signIn } from "next-auth/react"
import { Upload } from "../../components/upload"

export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return <Upload email={session.user.email}/>
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}