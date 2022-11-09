import { signOut } from "next-auth/react"

export function Overview(props: { email: string }) {
    const { email } = props;
    return (
        <>
            Signed in as {email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}
