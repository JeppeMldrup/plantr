import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};

export async function getLoginSession(){
    let session;
    try{
        [session] = await Promise.allSettled([getServerSession(authOptions)]);
    }
    catch(e){
        console.log(e);
    }
    return session;
}

export async function redirectToLogin(){
    let session
    try {
        session = await getLoginSession();
    }
    catch(e){
        redirect('/');
    }
    if (session?.value?.user){
        return false;
    }
    redirect('/');
}
