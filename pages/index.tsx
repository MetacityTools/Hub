import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Layout, Elements } from "../components/components";
import { checkRole } from "../lib/roles";

export default function Index() {
	const session = useSession();
	const email = session?.data?.user?.email;
	const router = useRouter();

    return (
        <Layout.PageLayout email={email}>
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