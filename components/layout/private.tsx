import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { checkRole } from "../../lib/roles";
import React from "react";

export function Private(props: { children: React.ReactNode, role: string }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	
	useEffect(() => {
        if (!status || status === "unauthenticated" ||
            (status === "authenticated" && !checkRole(session, props.role))) {
            setTimeout(() => router.push("/signin"), 500);
        }
	}, [session]);

    if (status === "loading" || !status || status === "unauthenticated" ||
        (status === "authenticated" && !checkRole(session, props.role))) {
        return (null);
    }
    
    return (<>{props.children}</>);
}