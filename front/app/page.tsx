import { useSession, signIn, signOut } from 'next-auth/react';
import { authOptions, getLoginSessionServer } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { LoginButton } from './buttons.component';
import { getLoginSession } from '@/lib/auth';

export default async function Home() {
    let session;
    try{
        session = await getLoginSession(authOptions);
    }
    catch(e){
        console.log(e);
    }
    //const { data: session } = useSession();
    console.log("HOME PAGE");
    console.log(session);
    if (session?.value?.user){
        redirect('/home');
    }
    return (
        <>
        <div class="w-screen h-screen flex justify-center items-center">
        <LoginButton />
        </div>
        </>
    )
}
