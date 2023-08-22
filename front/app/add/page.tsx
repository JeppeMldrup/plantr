import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { AddEntryButton } from './buttons.component';
import conn from '@/lib/db';
import { StatusBar } from '../buttons.component';

export default async function Add(){
    await redirectToLogin();
    let session;
    let garden;
    let plants;
    try {
        session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");
        garden = await getGardenId(session.value.user.email);
        const garden_id = garden.rows[0].garden_id;
        plants = await getAllPlants(garden_id);
        console.log(plants);
    }
    catch(e){
        console.log(e);
    }

    return (
        <>
        <StatusBar text="Add Harvest"/>
        <main className="w-full bg-gray-50 flex flex-col">
        <AddEntryButton plantList={plants} />
        </main>
        </>
    )
}

async function getGardenId(email: String){
    const query = "SELECT g.garden_id, g.name FROM users as u join garden as g on u.garden_id = g.garden_id WHERE u.email = crypt('" + email + "', email)";
    const result = await conn.query(query);
    return result;
}


async function getAllPlants(garden_id: Number){
    const query = "SELECT v.name, v.veg_id FROM veg AS v JOIN garden AS g ON v.garden_id = g.garden_id WHERE g.garden_id  = $1";
    const values = [garden_id];
    const result = await conn.query(query, values);
    console.log(result);
    return result.rows;
}
