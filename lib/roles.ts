import { Session } from "next-auth";



export function checkRole(session: Session | null, role: string) {
    return session && session.user && (session.user as any).role === role;
}