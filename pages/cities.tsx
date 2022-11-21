import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { checkRole } from "../lib/roles";
import { Layout, Elements } from "../components/components";
import React from "react";
import { City } from "@prisma/client";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Index() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;
	const router = useRouter();
	
	useEffect(() => {
        if (!status || status === "unauthenticated" ||
            (status === "authenticated" && !checkRole(session, "admin"))) {
            router.push("/signin");
        }
	}, [session]);
	
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
        <Layout.PageLayout email={email}>
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
    )
}