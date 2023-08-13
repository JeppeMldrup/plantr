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

export const StatusBar = (props: any) => {
    const {name} = props;
    const router = useRouter();
    return (
        <div className=' w-full h-14 bg-gray-300'>
            <div className=' h-full w-12 pl-3' onClick={() => {router.back()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-gray-700 h-full w-6 text-center self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
            </div>
        </div>
    );
}