import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    // Bypass the middleware for public routes
    if (pathname.startsWith('/auth') || pathname === '/') {
        return NextResponse.next();
    }

    // Redirect to login if there's no token and the route is protected
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}
