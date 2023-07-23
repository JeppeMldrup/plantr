import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "empty",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "empty",
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
    if (session?.status == "fulfilled" && session.value?.user){
        return false;
    }
    redirect('/');
}
