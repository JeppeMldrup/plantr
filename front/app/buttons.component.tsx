"use client";

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
    return (
        <button className=' transition-all text-gray-700 bg-gray-200 p-2 px-3 rounded hover:bg-gray-300 focus:bg-gray-400'
                onClick={() => signIn('google')}>Sign in with google</button>
    );
}

export const RedirectButton = (props: any) => {
    const {dest, text} = props;
    const router = useRouter();
    return (
        <button className=" transition-all w-full m-2 text-gray-700 bg-gray-200 hover:bg-gray-300 p-2 rounded focus:bg-gray-400"
                onClick={() => router.push(dest)}>{text}</button>
    );
}
