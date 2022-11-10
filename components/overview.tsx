import { signOut } from "next-auth/react"
import { Header } from "./layout/header";

export function Overview(props: { email: string }) {
    const { email } = props;
    return (
        <Header email={email} />
    )
}
