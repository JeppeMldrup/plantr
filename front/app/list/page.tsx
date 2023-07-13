import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { GardenCreationForm, GardenInviteJoin, InviteButton } from './form.component';
import conn from '@/lib/db';

export default async function List(){
    await redirectToLogin();
    let session;
    let garden;
    try {
        session = await getLoginSession();
        garden = await getGardenId(session.value.user.email);
        console.log(garden);
    }
    catch(e){
        console.log(e);
    }

    if (!garden.rows[0]){
        return (
            <>
            <main class="w-screen h-screen flex flex-col justify-center items-center">
            <GardenInviteJoin/>
            <div>
            <p class="text-xl">OR</p>
            </div>
            <GardenCreationForm userName={session.value.user.email}/>
            </main>
            </>
        );
    }
    return (
        <>
        <main class="w-screen h-screen flex flex-col">
        <p>{garden.rows[0].garden_id}</p>
        <InviteButton />
        </main>
        </>
    )
}

async function getGardenId(email){
    const query = "SELECT g.garden_id, g.name FROM users as u join garden as g on u.garden_id = g.garden_id WHERE u.email = '" + email + "'";
    const result = await conn.query(query);
    return result;
}
