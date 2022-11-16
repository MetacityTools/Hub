import { TopPanel } from "../layout/topPanel";
import { ItemsContainer, PlainContainer } from "../layout/container";
import { PageLayout } from "../layout/page";
import { CardLink, CardIcon, CardIconLink } from "../elements/card";
import {IoIosAddCircleOutline} from 'react-icons/io';
import { Breadcrumbs } from "../layout/breadcrumbs";
import { Modal } from "../layout/modal";
import React from "react";



export function CityOverview(props: { email: string }) {
    const { email } = props;
    
    return (
        <PageLayout email={email}>
            <PlainContainer>
            <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities"}]}/>
            </PlainContainer>
            <ItemsContainer>
                <CardIconLink title="Add City" icon={<IoIosAddCircleOutline/>} link="/actions/add/city"/>
                <CardLink annotation="city" title="Prague" link="/Prague" />
                <CardLink annotation="city" title="Brno" link="/Brno"/>
            </ItemsContainer>
        </PageLayout>
    )
}
