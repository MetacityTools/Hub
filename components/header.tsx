import { signOut } from "next-auth/react"


export function Header(props: { email: string }) {
    const { email } = props;
    return (
        <header className="flex flex-row justify-between p-4">
            <p>Signed in as {email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </header>
    )
}
