import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;

    try{
        const session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");

        let query = 'INSERT INTO garden(name) VALUES ($1) RETURNING garden_id';
        let values = [params.get('name')];

        let result = await pool.query(query, values);

        query = "UPDATE users SET garden_id = $1 where email = $2"
        values = [result.rows[0].garden_id, session.value.user.email];

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
