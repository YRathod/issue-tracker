import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id'
    ]
}

export async function middleware(request: NextRequest) {
    const session = await getServerSession();
    if(session){
        return NextResponse.redirect(request.nextUrl.pathname)
    }
  }