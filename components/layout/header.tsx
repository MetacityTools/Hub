import { signOut, signIn, useSession } from "next-auth/react"
import style from "./header.module.css"

export function Header() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;

    return (
        <header className={style.header}>
                { email ? <div className={style.title}>Signed in as {email}</div> : <div className={style.title}>Metacity</div> }
                { email ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign In</button> }
        </header>
    )
}
