import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

const userPage = ['/dashbaord']

export default function Auth(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
) {
    return async(req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname
    
        if(requireAuth.includes(pathname)) {
            const token = await getToken
        }
    }
}