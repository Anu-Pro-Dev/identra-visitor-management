import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  // Optionally, handle locale redirection here
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
};
