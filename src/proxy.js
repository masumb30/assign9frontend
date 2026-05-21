import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        // return NextResponse.redirect(new URL("/login", request.url));

        const loginUrl = new URL('/login', request.url);
        // Pass the original path + search params as a query param
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-idea", "/my-ideas", "/my-interactions", "/ideas/:path*"], // Specify the routes the middleware applies to
};