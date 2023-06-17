"use client";

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
    return (
        <button onClick={() => signIn('google')}>Sign in with google</button>
    );
}
