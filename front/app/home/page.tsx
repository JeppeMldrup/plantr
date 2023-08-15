import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { HomeBar, RedirectButton, StatusBar } from '../buttons.component';

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
        <HomeBar text="Home Page"/>
        <main className="w-screen h-screen flex flex-col bg-gray-50">
        <div className="w-screen h-20 items-center">
            <p className="">Logged in as {userName}</p>
            <button className="">Log out</button>
        </div>

        <div className=' my-8 self-center'>
            <span className=' block text-6xl text-green-500 md:inline'>GARDEN</span>
            <span className=' block text-6xl text-gray-700 md:inline'>TALLY</span>
        </div>

        <div className="flex justify-center w-screen h-20 max-w-[80%] mx-10 self-center">
            <RedirectButton dest="/list" text="Garden overview"/>
            <RedirectButton dest="/add" text="Create a harvest"/>
        </div>

        </main>
        </>
    )
}
