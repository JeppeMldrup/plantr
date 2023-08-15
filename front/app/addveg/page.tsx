import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { AddVegButton } from './buttons.component';
import { StatusBar } from '../buttons.component';

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
        <StatusBar text="Add New Vegetable"/>
        <main className=" w-screen h-screen bg-gray-50 flex flex-col">
            <p className=' self-center text-gray-700 my-2 text-2xl mx-8'>Add a new plant to your garden:</p>
        <AddVegButton />
        </main>
        </>
    )
}
