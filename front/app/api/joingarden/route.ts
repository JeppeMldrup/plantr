import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;

    try{
        const session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");

        let query = 'SELECT * FROM invite WHERE invite_code = $1';
        let values = [params.get('code')];

        let result = await pool.query(query, values);

        if (!result.rows[0]){
            console.log(params.get('code') + " not found in the database");
            throw new Error("No invite code");
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
    catch(e){
        return NextResponse.error();
    }
}

export async function GET(request: NextRequest){
    try{
        const session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");

        let query = 'SELECT g.garden_id FROM users AS u JOIN garden AS g ON u.garden_id = g.garden_id WHERE u.email = $1';
        let values = [session.value.user.email];

        let result = await pool.query(query, values);

        console.log(result);

        let code = makeCode(6);
        let id = result.rows[0].garden_id;

        console.log(code, id);

        query = 'INSERT INTO invite VALUES ($1, $2)';
        values = [code, id];

        result = await pool.query(query, values);

        return NextResponse.json({"code": code});
    }
    catch(e){
        return NextResponse.error();
    }
}

function makeCode(length: number) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() *  chars.length));
    }
    return result;
}

