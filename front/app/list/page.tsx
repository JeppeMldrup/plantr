import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { GardenCreationForm, GardenInviteJoin, InviteButton, AddVegButton } from './form.component';
import conn from '@/lib/db';

export default async function List(){
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
        console.log(garden);
    }
    catch(e){
        console.log(e);
    }

    if (!garden || !garden.rows[0]){
        return (
            <>
            <main className="w-screen h-screen flex flex-col justify-center items-center">
            <GardenInviteJoin/>
            <div>
            <p className="text-xl">OR</p>
            </div>
            <GardenCreationForm />
            </main>
            </>
        );
    }
    return (
        <>
        <main className="w-screen h-screen flex flex-col">
        <p>{garden.rows[0].garden_id}</p>
        <InviteButton />
        <div>
        <p className="text-xl">Garden contents:</p>
        </div>
        <div>
        {
            plants ? plants.map((veg: any) => <p key={veg.veg_id}>{veg.name}</p>) : null
        }
        </div>
        <AddVegButton />
        </main>
        </>
    )
}

async function getGardenId(email: String){
    const query = "SELECT g.garden_id, g.name FROM users as u join garden as g on u.garden_id = g.garden_id WHERE u.email = '" + email + "'";
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
