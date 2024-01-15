import Auth from "./middlewares/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function Middleware(request: NextRequest) {
    const res = NextResponse.next()
    return res
}

export default Auth(Middleware, [
    '/dashboard',
    '/login',
    'register'
])