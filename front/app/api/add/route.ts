import { NextResponse, NextRequest } from 'next/server';
import { getLoginSession } from '@/lib/auth';
import conn from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    console.log(params);

    try{
        const session = await getLoginSession();
        if (!session?.user?.email)
            throw new Error("No session");
        if (!params.get('veg') || !params.get('date') || !params.get('amount') || !params.get('weight'))
            throw new Error("Missing parameters");

        let query = "SELECT * FROM users AS u JOIN veg AS v on v.garden_id = u.garden_id WHERE u.email = crypt($1, email) AND v.veg_id = $2"
        let values = [session.user.email, params.get('veg')]
        let result = await conn.query(query, values);

        if (!result.rows[0])
            throw new Error("Trying to add harvest to unauthorised vegetable id");
        
        query = "INSERT INTO harvest(veg_id, date_of_harvest, amount, weight) VALUES ($1, $2, $3, $4)";
        values = [params.get('veg'), params.get('date'), params.get('amount'), params.get('weight')];

        result = await conn.query(query, values);

        console.log(result);

        return NextResponse.json({status: 200});
    }
    catch(error){
        return NextResponse.error();
    }
}
