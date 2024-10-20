import { logout } from '@/lib/api/auth';
import { type NextRequest, NextResponse } from 'next/server';

function shouldExclude(path: string) {
  return path.startsWith('/images') || path.startsWith('/icons') || path.startsWith('/oauth');
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token');
  if (shouldExclude(path)) return;
  if (!token) {
    return NextResponse.redirect(new URL('/oauth', request.url));
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
