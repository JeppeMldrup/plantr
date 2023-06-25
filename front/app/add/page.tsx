import { redirectToLogin, getLoginSession } from '@/lib/auth';

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
        </main>
        </>
    )
}
