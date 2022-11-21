import { User } from "@prisma/client";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Layout, Elements } from "../components/components";
import { checkRole } from "../lib/roles";


export default function Index() {
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const router = useRouter();

    useEffect(() => {
        if (!status || status === "unauthenticated" ||
            (status === "authenticated" && !checkRole(session, "admin"))) {
            router.push("/signin");
        }
    }, [session]);

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
        <Layout.PageLayout email={email}>
            <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Users" }]}/>
            </Layout.Containers.PlainContainer>
            <Layout.Containers.ItemsContainer>
                <Elements.UserTable users={users} />
            </Layout.Containers.ItemsContainer>
        </Layout.PageLayout>
    );
}