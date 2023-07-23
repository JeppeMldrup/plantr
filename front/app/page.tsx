import { redirect } from 'next/navigation';
import { LoginButton } from './buttons.component';
import { getLoginSession } from '@/lib/auth';
import conn from '@/lib/db';

export default async function Home() {
    let session;
    let shouldRedirect = false;
    try{
        session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");
        shouldRedirect = true;
        const encrypt = "crypt('" + session.value.user.email + "', gen_salt('bf', 8))";
        const query = "INSERT INTO users(email, garden_id) VALUES ("+ encrypt +", null) ON CONFLICT DO NOTHING";
        const result = conn.query(query);
    }
    catch(e){
        console.log(e);
    }
    //const { data: session } = useSession();
    console.log("HOME PAGE");
    console.log(session);
    if (shouldRedirect){
        redirect('/home');
    }
    return (
        <>
        <div className="w-screen h-screen flex justify-center items-center">
        <LoginButton />
        </div>
        </>
    )
}
