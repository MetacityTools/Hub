import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { AddCity } from "../../../components/pages/addCity"
import { checkRole } from "../../../lib/roles";


export default function Index() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (!status || status === "unauthenticated" ||
		(status === "authenticated" && !checkRole(session, "admin"))) {
		router.push("/signin");
	}

	if (session && session.user && session.user.email) {
		return <AddCity email={session.user.email}/>
	}
}