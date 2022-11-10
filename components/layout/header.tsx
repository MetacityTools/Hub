import { signOut } from "next-auth/react"
import styles from "./header.module.css"

export function Header(props: { email: string }) {
    const { email } = props;
    return (
        <header className={styles.header}>
            <div>Signed in as {email}</div>
            <button onClick={() => signOut()}>Sign out</button>
        </header>
    )
}
