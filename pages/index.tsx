import { useSession, signIn } from "next-auth/react"
import { Home } from "../components/pages/home"


export default function Index() {
	const { data: session } = useSession();

	if (session && session.user && session.user.email) {
		return (<Home email={session.user.email} />);
	}

	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}