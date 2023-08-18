"use client";

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    const {text} = props;
    const router = useRouter();
    return (
        <div className=' fixed w-full h-[8vh] -translate-y-[8vh] bg-gray-300 flex items-center justify-center'>
            <div className=' h-full w-[8vh] hover:bg-gray-400 active:bg-gray-500' onClick={() => {router.back()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-gray-700 h-full mx-[2vh] w-[4vh] text-center self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
</div>
            <span className=' text-gray-700 text-xl w-full text-center md:text-left md:ml-8 mr-[8vh]'>{text}</span>
        </div>
    );
}

export const HomeBar = (props: any) => {
    const {text} = props;
    const router = useRouter();

    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
        <div className=' fixed w-full h-[8vh] -translate-y-[8vh] bg-gray-300 flex items-center justify-center'>
            <div className=' h-full w-[8vh] hover:bg-gray-400 active:bg-gray-500' onClick={() => {setIsHidden(!isHidden)}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-gray-700 h-full mx-[2vh] w-[4vh] text-center self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

</div>
            <span className=' text-gray-700 text-xl w-full text-center md:text-left md:ml-8 mr-[8vh]'>{text}</span>
        </div>
        <div onClick={() => setIsHidden(!isHidden)}
            className={` fixed top-0 left-0 w-full h-full opacity-50 bg-gray-700 ${isHidden? "-translate-x-[100vw]" : ""}`}
        >
        </div>
        <div className={` fixed top-0 -left-[100vw] ${!isHidden? "translate-x-[100vw]" : "" } w-[80vw] md:w-2/5 h-full bg-gray-50 transition-all`}>
            <div onClick={() => setIsHidden(!isHidden)}
                className=' w-full px-4 text-gray-700 flex text-xl items-center h-[8vh] hover:bg-gray-300 active:bg-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
                Close menu
            </div>
            <div onClick={() => {
                signOut();
                router.replace('/');
                }}
                className=' w-full px-12 h-[8vh] flex-col flex justify-center text-xl hover:bg-gray-300 active:bg-gray-400 text-gray-700'>
                Logout
            </div>
        </div>
        </>
    );
}

/**
const SideMenu = () => {
    return (
        <div className={` fixed top-20 -left-[100vw] ${isHidden?}translate-x-[100vw] w-[80vw] h-full bg-green-400 transition-all`}>
            HERE WE GO
        </div>
    );
}
*/