import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { checkRole } from "../../../../lib/roles";
import React from "react";
import { Layout, Forms } from "../../../../components/components";

export default function Index() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;
	const router = useRouter();
    const { city } = router.query;
    const [error, setError] = React.useState<string | undefined>(undefined);


	if (!status || status === "unauthenticated" ||
		(status === "authenticated" && !checkRole(session, "admin"))) {
		router.push("/signin");
	}
	
    const handleSubmit = (name: string, files: File[]) => {
        console.log(name);
        console.log(files);

        if (name === "") {
            setError("Name cannot be empty");
            return;
        }

        if (files.length === 0) {
            setError("No files selected");
            return;
        }

        setError(undefined);

        const formData = new FormData();
        formData.append("dataset", name);
        formData.append("city", city as string);
        files.forEach((file) => {
            formData.append("files", file);
        });

        fetch("/api/datasets", {
            method: "POST",
            body: formData,
        }).then(async (res) => {
            const body = await res.json();
            if (res.ok)
                router.replace("/cities");
            else 
                setError(body.error);
        }).catch((err) => {
            setError(err);
        });
    };



    return (
        <Layout.PageLayout email={email}>
            <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, {title: city as string, link: "/" + city as string}, { title: "New Dataset"}]}/>
                </Layout.Containers.PlainContainer>
                <Layout.Containers.PageContainer>
                    <p>Add new dataset</p>
                    <p className="desc">The dataset will be uploaded and made available to all visitors.</p>
                    <Forms.FileSelect onSubmit={handleSubmit} error={error} />
                </Layout.Containers.PageContainer>
        </Layout.PageLayout>
    );
}