import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;

    try{
        const session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");
        
        if (params == null || !params.get('name'))
            throw new Error("Need garden name as parameter");

        let query = "SELECT garden_id FROM users WHERE email = crypt($1, email)";
        let values = [session.value.user.email];
        let result = await pool.query(query, values);

        if (result.rows[0] && result.rows[0].garden_id != null)
            throw new Error("Already has a garden");
        
        query = 'INSERT INTO garden(name) VALUES ($1) RETURNING garden_id';
        values = [params.get('name')];

        result = await pool.query(query, values);

        query = "UPDATE users SET garden_id = $1 where email = crypt($2, email)"
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
