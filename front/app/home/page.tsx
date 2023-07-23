import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { RedirectButton } from '../buttons.component';

export default async function Home(){
    await redirectToLogin();
    let session;
    let userName;
    try {
        session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user)
            throw new Error("No session");
        userName = session.value.user.name;
    }
    catch(e){
        console.log(e)
    }

    return (
        <>
        <main className="w-screen h-screen flex flex-col">
        <div className="w-screen h-20 items-center">
            <p className="">Logged in as {userName}</p>
            <button className="">Log out</button>
        </div>

        <h1 className="text-xl w-screen h-20 text-center">PlantAPI</h1>

        <div className="flex flex-wrap justify-center items-center w-screen h-20">
            <RedirectButton dest="/list" text="List of entries"/>
            <RedirectButton dest="/add" text="Add new entry"/>
        </div>

        </main>
        </>
    )
}
