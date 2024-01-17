import { getUserByEmail } from "@/lib/firebase/service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const data = await getUserByEmail(id)

        if(!data) {
            return NextResponse.json({
                status: 404,
                message: 'user not found',
                data: {}
            })
        }

        return NextResponse.json({
            status: 200,
            message: 'success',
            data: data,
        })
    }
    catch (err) {
        return NextResponse.json({
            status: 400,
            message: err
        })
    }
}