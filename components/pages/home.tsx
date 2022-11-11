import { TopPanel } from "../layout/topPanel";
import { Content } from "../layout/content";
import { PageLayout } from "../layout/page";
import Link from "next/link";



export function Home(props: { email: string }) {
    const { email } = props;

    return (
        <PageLayout email={email}>
            <TopPanel>
                <h1>Home</h1>
                <p>Description</p>
            </TopPanel>
            <Link href="/city">City</Link>
            <Content>
                <p>TODO master overview</p>

            </Content>
        </PageLayout>
    );
}
