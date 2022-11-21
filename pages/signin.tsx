import React from 'react'
import { getCsrfToken, getProviders, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Forms, AuthData } from '../components/components';


async function getData() {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken();

    return {
        providers,
        csrfToken,
    }
}

export default function SignInPage() {
    const [authData, setAuthData] = React.useState<AuthData>();
    const { status } = useSession();
    const router = useRouter();

    if (status === 'authenticated') {
        router.push('/');
    }

    React.useEffect(() => {
        getData().then((data) => {
            setAuthData(data);
        });
    }, []);

    return (<Forms.SignIn authData={authData} />);
}