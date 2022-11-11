import { TopPanel } from "../layout/topPanel";
import { Content } from "../layout/content";
import { PageLayout } from "../layout/page";
import { CardLink, CardIcon, CardIconLink } from "../items/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";
import { Modal } from "../layout/modal";
import React from "react";



export function CityOverview(props: { email: string }) {
    const { email } = props;
    
    return (
        <PageLayout email={email}>
            <TopPanel>
                <h1>Cities</h1>
                <p>Description</p>
            </TopPanel>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities"}]}/>
            <Content>
                <CardLink annotation="city" title="Prague" link="/city/Prague" />
                <CardLink annotation="city" title="Brno" link="/city/Prague"/>
                <CardIconLink title="Add City" icon={<IoIosAddCircleOutline/>} link="/add/city"/>
            </Content>
        </PageLayout>
    )
}
