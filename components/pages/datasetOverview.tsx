import { TopPanel } from "../layout/topPanel";
import { ItemsContainer, PlainContainer } from "../layout/container";
import { PageLayout } from "../layout/page";
import { CardLink, CardIcon, CardIconLink } from "../elements/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";
import React from "react";



export function DatasetOverview(props: { email: string, city: string }) {
    const { email, city } = props;

    return (
        <PageLayout email={email}>
            <PlainContainer>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, { title: city }]}/>
            </PlainContainer>
            <ItemsContainer>
                <CardIconLink title="Add Dataset" icon={<IoIosAddCircleOutline/>} link={"/actions/add/dataset/" + props.city}/>
                <CardLink title="test" annotation="dataset" link={"/" + city + "/dataset"}/>
                <CardLink title="test" annotation="dataset" link={"/" + city + "/dataset"}/>
            </ItemsContainer>
        </PageLayout>
    )
}
