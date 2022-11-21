import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { checkRole } from "../../../../lib/roles";
import React from "react";
import { Layout, Forms } from "../../../../components/components";

export default function Index() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;
	const router = useRouter();

	if (!status || status === "unauthenticated" ||
		(status === "authenticated" && !checkRole(session, "admin"))) {
		router.push("/signin");
	}
	
    const [files, setFiles] = React.useState<File[]>([]);
    const [selected, setSelected] = React.useState<File[]>([]);
    const [stage, setStage] = React.useState<number>(0);


    React.useEffect(() => {
        if (files.length > 0) {
            setStage(1);
        }
    }, [files]);

    React.useEffect(() => {
        if (selected.length > 0) {
            setStage(2);
        }
    }, [selected]);

    return (
        <Layout.PageLayout email={email}>
            { stage == 0 && <Forms.FileSelect onSelect={(files: File[]) => setFiles(files)}/>}
            { stage == 1 && <Forms.FileView 
                                files={files} 
                                onSubmit={(files: File[]) => setSelected(files)}
                                onAbort={() => setStage(0)}
                            />}
            { stage == 2 && <div>Upload</div>}
        </Layout.PageLayout>
    );
}