import React from 'react'
import { ClientSafeProvider, getCsrfToken, getProviders, LiteralUnion, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { BuiltInProviderType } from 'next-auth/providers';
import { AuthData, SignIn } from '../components/forms/signIn';


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

    return (<SignIn authData={authData} />);
}