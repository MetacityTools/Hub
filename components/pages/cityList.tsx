import { TopPanel } from "../layout/topPanel";
import { Content } from "../layout/content";
import { PageLayout } from "../layout/page";
import { CardLink, CardIcon } from "../items/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";



export function CityList(props: { email: string }) {
    const { email } = props;
    return (
        <PageLayout email={email}>
            <TopPanel>
                <h1>Cities</h1>
                <p>Description</p>
            </TopPanel>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities"}]}/>
            <Content>
                <CardIcon title="Add City" icon={<IoIosAddCircleOutline/>} onClick={() => alert("hello")}/>
                <CardLink title="Prague" link="/city/Prague" />
                <CardLink title="Brno" link="/city/Prague"/>
            </Content>
        </PageLayout>
    )
}
