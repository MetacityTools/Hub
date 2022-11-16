import { signOut, signIn } from "next-auth/react"
import { PlainContainer } from "./container";
import style from "./header.module.css"

export function Header(props: { email?: string | null }) {
    const { email } = props;
    return (
        <header className={style.header}>
                { props.email ? <div className={style.title}>Signed in as {email}</div> : <div className={style.title}>Metacity</div> }
                { props.email ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign In</button> }
        </header>
    )
}
