import { NextResponse, NextRequest } from 'next/server';
import conn from '@/lib/db';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    console.log(params);

    try{
        let query = "INSERT INTO harvest(veg_id, date_of_harvest, amount, weight) VALUES ($1, $2, $3, $4)";
        let values = [params.get('veg'), params.get('date'), params.get('amount'), params.get('weight')];

        let result = await conn.query(query, values);

        console.log(result);

        return NextResponse.json({status: 200});
    }
    catch(error){
        return NextResponse.error();
    }
}
