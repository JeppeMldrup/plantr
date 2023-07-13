import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession, authOptions } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    console.log(params.get('code'));
    const session = await getLoginSession(authOptions);
    console.log(session);

    let query = 'SELECT * FROM invite WHERE invite_code = $1';
    let values = [params.get('code')];

    let result = await pool.query(query, values);

    if (!result.rows[0]){
        console.log(params.get('code') + " not found in the database");
        return NextResponse.status(404);
    }

    const id = result.rows[0].garden_id;

    query = "DELETE FROM invite WHERE invite_code = $1"
    values = [params.get('code')];

    result = pool.query(query, values);

    query = "UPDATE users SET garden_id = $1 where email = $2"
    values = [id, session.value.user.email];

    result = await pool.query(query, values);

    return NextResponse.json({status: 200});
}
