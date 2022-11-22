import { useSession } from "next-auth/react"
import { Layout, Elements } from "../components/components";
import { checkRole } from "../lib/roles";

export default function Index() {
	const session = useSession();

    return (
        <Layout.PageLayout>
            <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity"}]}/>
            </Layout.Containers.PlainContainer>
            <Layout.Containers.ItemsContainer>
                { checkRole(session.data, "admin") && <Elements.Card.CardLink title="Cities" link="/cities" /> }
                { checkRole(session.data, "admin") && <Elements.Card.CardLink title="Users" link="/users" /> }
            </Layout.Containers.ItemsContainer>
        </Layout.PageLayout>
    );
}