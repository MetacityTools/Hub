import { TopPanel } from "../layout/topPanel";
import { Content } from "../layout/content";
import { PageLayout } from "../layout/page";
import { Card, CardIcon, CardIconLink } from "../items/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";



export function DatasetOverview(props: { email: string, city: string }) {
    const { email } = props;
    return (
        <PageLayout email={email}>
            <TopPanel>
                <h1>{props.city}</h1>
                <p>Description</p>
            </TopPanel>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/city"}, { title: props.city }]}/>
            <Content>
                <CardIconLink title="Add Dataset" icon={<IoIosAddCircleOutline/>} link={"/upload/" + props.city}/>
                <Card title="test"/>
                <Card title="test"/>
            </Content>
        </PageLayout>
    )
}
