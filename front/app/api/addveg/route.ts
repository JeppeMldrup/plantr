import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    const vegName = params.get('name');
    let vegDate = params.get('date');

    try{
        if (vegName == ""){
            throw new Error("plant name cannot be empty");
        }
        if (!vegDate){
            vegDate = new Date().toISOString().split("T")[0];
        }
        const session = await getLoginSession();
        if (!session?.user?.email)
            throw new Error("No session");

        let query = "SELECT g.garden_id FROM garden AS g JOIN users AS u ON g.garden_id = u.garden_id WHERE u.email = crypt($1, email)";
        let values = [session.user.email];

        let result = await pool.query(query, values);

        console.log(result);

        const garden_id = result.rows[0].garden_id;

        query = "INSERT INTO veg(garden_id, name, status, planting_date) VALUES ($1, $2, $3, $4)";
        values = [garden_id, vegName, "alive", vegDate];

        result = await pool.query(query, values);

        console.log(result);

        return NextResponse.json({status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.error();
    }
}
