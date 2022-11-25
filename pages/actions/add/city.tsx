import { useRouter } from "next/router";
import React from "react";
import { Layout, Forms } from "../../../components/components";

export default function Index() {
	const router = useRouter();
    const [error, setError] = React.useState<string|undefined>();

    const handleSubmit = (city: string) => {
        if (city) {
            setError(undefined);
            fetch("/api/cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    city: city,
                }),
            }).then(async (res) => {
                const body = await res.json();
                if (res.ok) {
                    router.replace("/cities");
                } else {
                    setError(body.error);
                }
            }).catch((err) => {
                setError(err);
            });
        }
    };

    
    return (
        <Layout.Private role="admin">
            <Layout.PageLayout>
                <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, {title: "New City"}]}/>
                </Layout.Containers.PlainContainer>
                <Layout.Containers.PageContainer>
                    <p>Fill out the name of the city</p>
                    <p className="desc">The created city will be visible for anyone and all registred members will be allowed to upload new datasets to the created city.</p>
                    <Forms.CityAdd onSubmit={handleSubmit} error={error}/>
                </Layout.Containers.PageContainer>
            </Layout.PageLayout>
        </Layout.Private>
    );
}