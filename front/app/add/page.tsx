import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { AddEntryButton } from './buttons.component';
import conn from '@/lib/db';

export default async function Add(){
    await redirectToLogin();
    let session;
    let garden;
    let plants;
    try {
        session = await getLoginSession();
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
        <main class="w-screen h-screen">
        <p>Nice</p>
        <AddEntryButton plantList={plants} />
        </main>
        </>
    )
}

async function getGardenId(email){
    const query = "SELECT g.garden_id, g.name FROM users as u join garden as g on u.garden_id = g.garden_id WHERE u.email = '" + email + "'";
    const result = await conn.query(query);
    return result;
}


async function getAllPlants(garden_id){
    const query = "SELECT v.name FROM veg AS v JOIN garden AS g ON v.garden_id = g.garden_id WHERE g.garden_id  = $1";
    const values = [garden_id];
    const result = await conn.query(query, values);
    console.log(result);
    return result.rows;
}
