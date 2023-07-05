import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { AddEntryButton } from '../buttons.component';

export default async function Add(){
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
        <p>Nice</p>
        <AddEntryButton />
        </main>
        </>
    )
}
