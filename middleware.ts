import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
 
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/en/view/hongnanchen', request.url));
    }
    // return i18nRouter(request, i18nConfig);
}

// export const config = {
//     matcher: '/((?!api|static|.*\\..*|_next).*)'
//   };
