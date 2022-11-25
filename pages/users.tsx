import { User } from "@prisma/client";
import React from "react";
import { Layout, Elements } from "../components/components";


export default function Index() {
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
        <Layout.Private role="admin">
            <Layout.PageLayout>
                <Layout.Containers.PlainContainer>
                    <Layout.Breadcrumbs items={[{ title: "Metacity", link: "/" }, { title: "Users" }]} />
                </Layout.Containers.PlainContainer>
                <Layout.Containers.ItemsContainer>
                    <Elements.UserTable users={users} />
                </Layout.Containers.ItemsContainer>
            </Layout.PageLayout>
        </Layout.Private>
    );
}