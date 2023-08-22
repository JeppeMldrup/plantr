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
        checkAndCreateAccount(session.value.user.email);
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
        <div className="w-full flex flex-col items-center pt-20 bg-gray-50">
        <div className='flex flex-col md:flex-row'>
            <p className=' block text-6xl text-green-500'>GARDEN</p>
            <p className=' block text-6xl text-gray-700'>TALLY</p>
        </div>
        <div className=' pt-20'></div>
        <p className='  text-gray-700 w-1/2 text-center'>Easily track the harvests and plants from your garden</p>
        <div className=' pt-20'></div>
        <LoginButton />
        </div>
        </>
    )
}

const checkAndCreateAccount = async (email: String) => {
    let query = "SELECT * FROM users WHERE email = crypt($1, email)";
    let values = [email];
    let result = await conn.query(query, values);

    console.log(result);

    if (result.rows[0]){
        return;
    }

    //let encrypt = "crypt('" + session.value.user.email + "', gen_salt('bf', 8))";
    query = "INSERT INTO users(email, garden_id) VALUES (crypt($1, gen_salt('md5')), null)";
    values = [email];
    result = await conn.query(query, values);

    console.log(result);
}