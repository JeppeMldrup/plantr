"use client";

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
    return (
        <button className=' transition-all text-slate-600 bg-slate-300 p-2 px-3 rounded hover:bg-slate-400 focus:bg-slate-500'
                onClick={() => signIn('google')}>Sign in with google</button>
    );
}

export const RedirectButton = (props: any) => {
    const {dest, text} = props;
    const router = useRouter();
    return (
        <button className=" transition-all w-full m-2 text-slate-600 bg-slate-300 hover:bg-slate-400 p-2 rounded focus:bg-slate-500"
                onClick={() => router.push(dest)}>{text}</button>
    );
}
