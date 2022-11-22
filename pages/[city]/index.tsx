import { Dataset } from "@prisma/client";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import React from "react";
import { useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Layout, Elements } from "../../components/components";
import { checkRole } from "../../lib/roles";


export default function Index() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;
	const router = useRouter();
	const { city } = router.query;

	useEffect(() => {
		if (!status || status === "unauthenticated" ||
			(status === "authenticated" && !checkRole(session, "admin"))) {
			router.push("/signin");
		}
	}, [session]);


	const [datasets, setDatasets] = React.useState<Dataset[]>([]);

    React.useEffect(() => {
		if (!city)
			return;
        fetch("/api/" + city + "/datasets", {
            method: "GET",
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
					console.log(data);
                    setDatasets(data.datasets);
                });
            }
        });
    }, [city]);

	return (
		<Layout.PageLayout email={email}>
			<Layout.Containers.PlainContainer>
				<Layout.Breadcrumbs items={[{ title: "Metacity", link: "/" }, { title: "Cities", link: "/cities" }, { title: city as string }]} />
			</Layout.Containers.PlainContainer>
			<Layout.Containers.ItemsContainer>
				<Elements.Card.CardIconLink title="Add Dataset" icon={<IoIosAddCircleOutline />} link={"/actions/add/" + city + "/dataset"} />
				{datasets.map((dataset) => (
					<Elements.Card.CardLink annotation="dataset" title={dataset.name} link={"/" + city + "/" + dataset.name} key={dataset.id} />
				))}
			</Layout.Containers.ItemsContainer>
		</Layout.PageLayout>);
}