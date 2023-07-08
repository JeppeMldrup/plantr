import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest){
    const params = request.nextUrl.searchParams;
    console.log(params);
    return NextResponse.json({status: 200});
}
