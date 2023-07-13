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

    result = await pool.query(query, values);

    query = "UPDATE users SET garden_id = $1 where email = $2"
    values = [id, session.value.user.email];

    result = await pool.query(query, values);

    return NextResponse.json({status: 200});
}

export async function GET(request: NextRequest){
    const session = await getLoginSession(authOptions);

    if(!session?.value.user.email){
        console.log("Cannot generate invite link without being logged in");
        return NextResponse.status(404);
    }

    let query = 'SELECT g.garden_id FROM users AS u JOIN garden AS g ON u.garden_id = g.garden_id WHERE u.email = $1';
    let values = [session.value.user.email];

    let result = await pool.query(query, values);

    console.log(result);

    /*
    if (!result.rows[0]){
        console.log("Cannot generate invite link without having a garden");
        return NextResponse.status(404);
    }
    */

    let code = makeCode(6);
    let id = result.rows[0].garden_id;

    console.log(code, id);

    query = 'INSERT INTO invite VALUES ($1, $2)';
    values = [code, id];

    result = await pool.query(query, values);

    return NextResponse.json({"code": code});
}

function makeCode(length) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() *  chars.length));
    }
    return result;
}

