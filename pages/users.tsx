import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Users } from "../components/pages/users"
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
        return (<Users email={session.user.email} />);
    }
}