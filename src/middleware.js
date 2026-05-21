import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('better-auth.session_token');

  const { pathname } = request.nextUrl;
  const isPrivateRoute =
    pathname.startsWith('/booking') || pathname.startsWith('/manage');
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/booking/:path*', '/manage/:path*'],
};
