import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

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

export async function getLoginSessionServer(){
    const session = await getServerSession(authOptions);
    console.log("FUNCTION CALLED");
    console.log(session);
    return session;
}

export async function getLoginSession(){
    const { data: session} = useSession();
    return session;
}
