import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { checkRole } from "../../lib/roles";


export default function Dataset() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { city, dataset } = router.query;

	useEffect(() => {
        if (!status || status === "unauthenticated" ||
            (status === "authenticated" && !checkRole(session, "admin"))) {
            router.push("/signin");
        }
	}, [session]);

	console.log(city, dataset);
	if (session && session.user && session.user.email) {
		return (dataset);
	}
}