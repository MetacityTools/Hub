import React from "react";
import { CityAdd } from "../forms/cityAdd";
import { Breadcrumbs } from "../layout/breadcrumbs";
import { PageContainer, PlainContainer } from "../layout/container";
import { PageLayout } from "../layout/page";



export function AddCity(props: { email: string }) {
    const { email } = props;

    const [error, setError] = React.useState<string>();


    const handleSubmit = (city: string) => {
        if (city) {
            setError("this is wrong");
            //fetch("/api/cities", {
            //    method: "POST",
            //    headers: {
            //        "Content-Type": "application/json",
            //    },
            //    body: JSON.stringify({
            //        name: city,
            //    }),
            //}).then((res) => {
            //    if (res.ok) {
            //        //window.location.href = "/cities";
            //    }
            //});
        }
    };

    
    return (
        <PageLayout email={email}>
            <PlainContainer>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, {title: "New City"}]}/>
            </PlainContainer>
            <PageContainer>
                <p>Fill out the name of the city</p>
                <p className="desc">The created city will be visible for anyone and all registred members will be allowed to upload new datasets to the created city.</p>
                <CityAdd onSubmit={handleSubmit} error={error}/>
            </PageContainer>
        </PageLayout>
    );
}