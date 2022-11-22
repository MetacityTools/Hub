import { Dataset } from "@prisma/client";
import { useRouter } from 'next/router'
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Layout, Elements } from "../../components/components";
import { Private } from "../../components/private";


export default function Index() {
	const [datasets, setDatasets] = React.useState<Dataset[]>([]);
	const router = useRouter();
	const { city } = router.query;

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
		<Private role="admin">
			<Layout.PageLayout>
				<Layout.Containers.PlainContainer>
					<Layout.Breadcrumbs items={[{ title: "Metacity", link: "/" }, { title: "Cities", link: "/cities" }, { title: city as string }]} />
				</Layout.Containers.PlainContainer>
				<Layout.Containers.ItemsContainer>
					<Elements.Card.CardIconLink title="Add Dataset" icon={<IoIosAddCircleOutline />} link={"/actions/add/" + city + "/dataset"} />
					{datasets.map((dataset) => (
						<Elements.Card.CardLink annotation="dataset" title={dataset.name} link={"/" + city + "/" + dataset.name} key={dataset.id} />
					))}
				</Layout.Containers.ItemsContainer>
			</Layout.PageLayout>
		</Private>
	);
}