"use client";

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
    return (
        <button onClick={() => signIn('google')}>Sign in with google</button>
    );
}

export const RedirectButton = (props) => {
    const {dest, text} = props;
    const router = useRouter();
    return (
        <button class="w-40 h-10" onClick={() => router.push(dest)}>{text}</button>
    );
}

export const AddEntryButton = () => {
    const clickHandler = () => {
        let thing = fetch('/api/add?thing=nice', {method: "POST"});
        thing.then(t => console.log(t));
    }
    return (
        <button onClick={() => clickHandler()}>Add</button>
    );
}
