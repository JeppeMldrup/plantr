import { useSession, signIn, signOut } from 'next-auth/react';
import { authOptions, getLoginSessionServer } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { LoginButton } from '@/components/buttons.component';

export default async function Home() {
    let session;
    try{
        [session] = await Promise.allSettled([getServerSession(authOptions)]);
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

async function getLoginSession(){
    const session = await getServerSession(authOptions);
    console.log(session);
    return session;
}
