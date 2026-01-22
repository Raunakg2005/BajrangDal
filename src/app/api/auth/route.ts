import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { password } = body;

        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "JaiShriRam"; // Fallback only for dev

        if (password === ADMIN_PASSWORD) {
            // In a real app, set a HttpOnly cookie here using 'cookies()' from next/headers
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
