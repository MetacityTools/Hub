import { ItemsContainer, PlainContainer } from "../layout/container";
import { PageLayout } from "../layout/page";
import React from "react";
import { User } from "@prisma/client";
import { Breadcrumbs } from "../layout/breadcrumbs";
import { UserTable } from "../elements/userTable";


export function Users(props: { email: string }) {
    const { email } = props;
    const [users, setUsers] = React.useState<User[]>([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then(
                (result) => {
                    setUsers(result.users);
                },
                (error) => {
                    setError(error);
                }
            );
    }, []);
        

    return (
        <PageLayout email={email}>
            <PlainContainer>
                <Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Users" }]}/>
            </PlainContainer>
            <ItemsContainer>
                <UserTable users={users} />
            </ItemsContainer>
        </PageLayout>
    );
}
