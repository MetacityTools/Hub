import { Layout, Elements } from "../components/components";
import { City } from "@prisma/client";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Private } from "../components/private";
import React from "react";

export default function Index() {
	const [cities, setCities] = React.useState<City[]>([]);

    React.useEffect(() => {
        fetch("/api/cities", {
            method: "GET",
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCities(data.cities);
                });
            }
        });
    }, []);

    return (
        <Private role="admin">
            <Layout.PageLayout>
                <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities"}]}/>
                </Layout.Containers.PlainContainer>
                <Layout.Containers.ItemsContainer>
                    <Elements.Card.CardIconLink title="Add City" icon={<IoIosAddCircleOutline/>} link="/actions/add/city"/>
                    {cities.map((city) => (
                        <Elements.Card.CardLink annotation="city" title={city.name} link={`/${city.name}`} key={city.name}/>
                    ))}
                </Layout.Containers.ItemsContainer>
            </Layout.PageLayout>
        </Private>
    )
}