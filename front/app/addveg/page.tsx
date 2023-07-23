import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { AddVegButton } from './buttons.component';

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
        <main class="w-screen h-screen">
        <p>Nice</p>
        <AddVegButton />
        </main>
        </>
    )
}
