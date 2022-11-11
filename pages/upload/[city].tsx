import { useSession, signIn } from "next-auth/react"
import { FileSelect } from "../../components/form/fileSelect"
import { DatasetUpload } from "../../components/pages/datasetUpload"

export default function Index() {
	const { data: session } = useSession()
	if (session && session.user && session.user.email) {
		return (
			<DatasetUpload email={session.user.email}/>
		)
	}
	//todo redirect
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}