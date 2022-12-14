import { useRouter } from "next/router";
import React from "react";
import { Layout, Forms } from "../../../../components/components";

export default function Index() {
	const router = useRouter();
    const { city } = router.query;
    const [error, setError] = React.useState<string | undefined>(undefined);

    const handleSubmit = (name: string, files: File[]) => {
        console.log(name);
        console.log(files);
        console.log(city);

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

        fetch("/api/" + city, {
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
        <Layout.Private role="admin">
            <Layout.PageLayout>
                <Layout.Containers.PlainContainer>
                    <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, {title: city as string, link: "/" + city as string}, { title: "New Dataset"}]}/>
                    </Layout.Containers.PlainContainer>
                    <Layout.Containers.PageContainer>
                        <p>Add new dataset</p>
                        <p className="desc">The dataset will be uploaded and made available to all visitors.</p>
                        <Forms.FileSelect onSubmit={handleSubmit} error={error} />
                    </Layout.Containers.PageContainer>
            </Layout.PageLayout>
        </Layout.Private>
    );
}