import { redirectToLogin, getLoginSession } from '@/lib/auth';
import conn from '@/lib/db';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import { NextRequest, NextResponse } from 'next/server';


export default async function Stats(req: any, res: NextResponse){
    await redirectToLogin();
    let session;
    console.log("nice", req?.searchParams, "nice");
    let veg_id = req?.searchParams?.veg || null;
    let weight;
    let count;
    let userName;
    try {
        session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");
        
        userName = session.value.user.name;
        
        let query;
        let values;

        if(veg_id){
            query = "SELECT SUM(h.weight) AS weight, SUM(h.amount) AS amount FROM users AS u JOIN veg AS v ON u.garden_id = v.garden_id " +
                    "JOIN harvest AS h ON v.veg_id = h.veg_id WHERE u.email = crypt($1, email) AND v.veg_id = $2";
            values = [session.value.user.email, veg_id];
        }
        else{
            query = "SELECT SUM(h.weight) AS weight, SUM(h.amount) AS amount FROM users AS u JOIN veg AS v ON u.garden_id = v.garden_id " +
                    "JOIN harvest AS h ON v.veg_id = h.veg_id WHERE u.email = crypt($1, email)";
            values = [session.value.user.email];
        }

        let result = await conn.query(query, values);

        weight = result.rows[0].weight;
        count = result.rows[0].amount;

        console.log(result);
    }
    catch(e){
        console.log(e);
    }
    return (
        <>
        <main className="w-screen h-screen flex flex-col items-center bg-gray-50 pt-10">
            <p>
                {veg_id ? <p>Total stats for vegetable number: {veg_id}</p> : <p>Total stats for user: {userName}</p>}
            </p>
            <p>
                Number of vegetables: {count}
            </p>
            <p>
                Total weight of vegetables: {weight}
            </p>
        </main>
        </>
    );
}