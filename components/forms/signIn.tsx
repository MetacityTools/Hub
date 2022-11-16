import React from 'react'
import { ClientSafeProvider, LiteralUnion } from "next-auth/react"
import { useRouter } from "next/router";
import { BuiltInProviderType } from 'next-auth/providers';
import style from './signIn.module.css';
import { AiFillGithub } from 'react-icons/ai';



export interface AuthData {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
    csrfToken: string | undefined;
}


export function SignIn(props: { authData?: AuthData }) {
    const { authData } = props;
    const router = useRouter();

    if (!authData || !authData.providers)
        return <div>Loading...</div>

    return (
        <form action={authData.providers.github.signinUrl} method="POST" className={style.form}>
            <h1>Metacity Lab</h1>
            <input type="hidden" name="csrfToken" value={authData.csrfToken} />
            {authData.providers.github.callbackUrl && (
                <input type="hidden" name="callbackUrl" value={router.query.callbackUrl} />
            )}

            <button type="submit" className={style.signInGithub}>
                <AiFillGithub className={style.icon}/> Sign in with {authData.providers.github.name}
            </button>
        </form>
    );
}