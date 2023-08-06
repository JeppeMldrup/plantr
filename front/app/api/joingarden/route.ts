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

        console.log(result);
        const id = result.rows[0].garden_id;
        console.log(id);

        query = "DELETE FROM invite WHERE invite_code = $1";
        values = [params.get('code')];

        result = await pool.query(query, values);

        query = "UPDATE users SET garden_id = $1 WHERE email = crypt($2, email)";
        values = [id, session.value.user.email];

        result = await pool.query(query, values);

        console.log(result);

        return NextResponse.json({status: 200});
    }
    catch(e){
        console.log("Unexpected error occured while joining garden:", e);
        return NextResponse.error();
    }
}

export async function GET(request: NextRequest){
    try{
        const session = await getLoginSession();
        if (!(session?.status == "fulfilled") || !session.value?.user?.email)
            throw new Error("No session");

        let query = 'SELECT i.invite_code FROM invite AS i JOIN users AS u ON i.garden_id = u.garden_id WHERE u.email = crypt($1, email)';
        let values = [session.value.user.email];

        try{
            let result = await pool.query(query, values);

            if (result.rows[0] && result.rows[0].invite_code){
                return NextResponse.json({"code": result.rows[0].invite_code});
            }
        }
        catch (e){
            console.log('No code exists already, generating a new one');
        }

        query = 'SELECT garden_id FROM users WHERE email = crypt($1, email)';
        values = [session.value.user.email];

        let result = await pool.query(query, values);

        console.log(result);

        let id = result.rows[0].garden_id;
        let code;
        let overlap = true;
        
        while (overlap){
            code = makeCode(6);

            console.log(code, id);
    
            query = 'INSERT INTO invite VALUES ($1, $2)';
            values = [code, id];
    
            try{
                result = await pool.query(query, values);
                overlap = false;
            }
            catch (e){
                console.log("Same code already exists in the database!");
            }
        }
    
        return NextResponse.json({"code": code});
    }
    catch(e){
        console.log('Unexpected error fetching an invite code: ' + e);
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

