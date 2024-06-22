import { redirect } from 'next/navigation';
import Google from 'next-auth/providers/google';
import NextAuth, { Session } from 'next-auth';

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Google],
});

export async function getLoginSession(): Promise<Session|null> {
    return await auth();
}

export async function redirectToLogin(){
    const session = await auth();
    if (!session){
        redirect('/');
    }
}
