import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Home } from "../components/pages/home"


export default function Index() {
	const { data: session, status } = useSession();
	const router = useRouter();


	return (<Home email={session?.user?.email} />);
}