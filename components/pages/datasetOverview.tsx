import { TopPanel } from "../layout/topPanel";
import { Content } from "../layout/content";
import { PageLayout } from "../layout/page";
import { CardLink, CardIcon, CardIconLink } from "../items/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";
import React from "react";



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
                <CardLink title="test" />
                <CardLink title="test" />
                <CardIconLink title="Add Dataset" icon={<IoIosAddCircleOutline/>} link={"/upload/" + props.city}/>
            </Content>
        </PageLayout>
    )
}
