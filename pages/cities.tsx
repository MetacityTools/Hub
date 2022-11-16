import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CityOverview } from "../components/pages/cityOverview"
import { checkRole } from "../lib/roles";

export default function Index() {
	const { data: session, status } = useSession();
	const router = useRouter();
	
	useEffect(() => {
        if (!status || status === "unauthenticated" ||
            (status === "authenticated" && !checkRole(session, "admin"))) {
            router.push("/signin");
        }
	}, [session]);
	
	if (session && session.user && session.user.email) {
		return <CityOverview email={session.user.email}/>
	}
}