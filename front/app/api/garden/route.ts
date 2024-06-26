import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    const gardenName = params.get('name');

    try{
        const session = await getLoginSession();
        if (!session?.user?.email)
            throw new Error("No session");
        
        if (!gardenName)
            throw new Error("Need garden name as parameter");

        let query = "SELECT garden_id FROM users WHERE email = crypt($1, email)";
        let values = [session.user.email];
        let result = await pool.query(query, values);

        if (result.rows[0] && result.rows[0].garden_id != null)
            throw new Error("Already has a garden");
        
        query = 'INSERT INTO garden(name) VALUES ($1) RETURNING garden_id';
        values = [gardenName];

        result = await pool.query(query, values);

        query = "UPDATE users SET garden_id = $1 where email = crypt($2, email)"
        values = [result.rows[0].garden_id, session.user.email];

        console.log(result.rows[0].garden_id);
        console.log(values);

        result = await pool.query(query, values);

        console.log(result);

        return NextResponse.json({status: 200});
    }
    catch(e){
        return NextResponse.error();
    }
}
