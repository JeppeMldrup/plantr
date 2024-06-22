import { redirectToLogin, getLoginSession } from '@/lib/auth';
import { GardenCreationForm, GardenInviteJoin, InviteButton, AddVegButton, VegList } from './form.component';
import { StatusBar } from '../buttons.component';
import conn from '@/lib/db';

export default async function List(){
    await redirectToLogin();
    let session;
    let garden;
    let plants;
    try {
        session = await getLoginSession();
        if (!session?.user?.email)
            throw new Error("No session");
        garden = await getGardenId(session.user.email);
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
            <StatusBar text="Join garden" />
            <main className="w-full flex flex-col items-center bg-gray-50 pt-10">
            <p className=' text-slate-400 mb-5 text-2xl text-center w-3/4'>Your account is not connected to a garden yet</p>
            <GardenInviteJoin/>
            <div className=' flex justify-around w-2/3 max-w-[25rem] my-4'>
                <span className=' bg-slate-400 h-px w-full self-center mx-4'></span>
                <span className=" text-xl text-slate-400">OR</span>
                <span className=' bg-slate-400 h-px w-full self-center mx-4'></span>
            </div>
            <GardenCreationForm />
            </main>
            </>
        );
    }
    return (
        <>
        <StatusBar text="Contents" />
        <main className="w-full flex flex-col bg-gray-50 items-center">
        <div>
        <p className="text-xl">Contents of {garden.rows[0].name}:</p>
        </div>
        <div className=' w-4/5 max-w-[80ch]'>
        <VegList className='w-1/2' plantList={plants} />
        </div>
        </main>
        </>
    )
}

async function getGardenId(email: String){
    const query = "SELECT g.garden_id, g.name FROM users as u join garden as g on u.garden_id = g.garden_id WHERE u.email = crypt('$1', email)";
    let values = [email];
    let result = await conn.query(query, values);
    return result;
}

async function getAllPlants(garden_id: Number){
    const query = "SELECT v.name, v.veg_id FROM veg AS v JOIN garden AS g ON v.garden_id = g.garden_id WHERE g.garden_id  = $1";
    const values = [garden_id];
    const result = await conn.query(query, values);
    console.log(result);
    return result.rows;
}
