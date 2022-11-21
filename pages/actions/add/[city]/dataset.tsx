import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { checkRole } from "../../../../lib/roles";
import React from "react";
import { Layout, Forms } from "../../../../components/components";

export default function Index() {
	const { data: session, status } = useSession();
	const email = session?.user?.email;
	const router = useRouter();
    const { city } = router.query;


	//if (!status || status === "unauthenticated" ||
	//	(status === "authenticated" && !checkRole(session, "admin"))) {
	//	router.push("/signin");
	//}
	
    const handleSubmit = (name: string, files: File[]) => {
   
    };



    return (
        <Layout.PageLayout email={email}>
            <Layout.Containers.PlainContainer>
                <Layout.Breadcrumbs items={[{title: "Metacity", link: "/"}, {title: "Cities", link: "/cities"}, {title: city as string, link: "/" + city as string}, { title: "New Dataset"}]}/>
                </Layout.Containers.PlainContainer>
                <Layout.Containers.PageContainer>
                    <p>Add your datasets</p>
                    <p className="desc">The datasets will be uploaded and made available to all visitors.</p>
                    <Forms.FileSelect onSubmit={handleSubmit} error="" />
                </Layout.Containers.PageContainer>
        </Layout.PageLayout>
    );
}