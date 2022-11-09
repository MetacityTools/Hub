import { signOut } from "next-auth/react"
import { FileUploader } from "./fileUploader";
import { Header } from "./header";

export function Upload(props: { email: string }) {
    const { email } = props;
    return (
        <div className="h-screen w-screen flex flex-col">
            <Header email={email} />
            <FileUploader />
        </div>
    )
}

