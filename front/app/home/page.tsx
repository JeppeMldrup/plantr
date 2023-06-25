import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RedirectButton } from '../buttons.component';

export default async function Home(){
    await redirectToLogin();
    let session;
    try {
        session = await getLoginSession();
    }
    catch(e){
    }

    return (
        <>
        <main class="w-screen h-screen flex flex-col">
        <div class="w-screen h-20 items-center">
            <p class="">Logged in as {session.value.user.name}</p>
            <button class="">Log out</button>
        </div>

        <h1 class="text-xl w-screen h-20 text-center">PlantAPI</h1>

        <div class="flex flex-wrap justify-center items-center w-screen h-20">
            <RedirectButton dest="/list" text="List of entries"/>
            <RedirectButton dest="/add" text="Add new entry"/>
        </div>

        </main>
        </>
    )
}
