import { ItemsContainer, PlainContainer } from "../layout/container";
import { PageLayout } from "../layout/page";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { checkRole } from "../../lib/roles";
import { Breadcrumbs } from "../layout/breadcrumbs";
import { CardLink } from "../elements/card";



export function Home(props: { email?: string | null }) {
    const { email } = props;
    const session = useSession();

    return (
        <PageLayout email={email}>
            <PlainContainer>
                <Breadcrumbs items={[{title: "Metacity"}]}/>
            </PlainContainer>
            <ItemsContainer>
                <CardLink title="Cities" link="/cities" />
                { checkRole(session.data, "admin") && <CardLink title="Users" link="/users" /> }
            </ItemsContainer>
        </PageLayout>
    );
}
