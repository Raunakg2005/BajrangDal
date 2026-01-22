import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";

// Config removed (App Router Route Handlers do not use this config for body limits, usually unlimited in Node runtime)

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation for required top-level fields
        if (!body.name || !body.phone || !body.age) {
            return NextResponse.json(
                { error: "Required fields are missing" },
                { status: 400 }
            );
        }

        const application = await Application.create(body);
        return NextResponse.json(
            { message: "Application submitted successfully!", application },
            { status: 201 }
        );
    } catch (error) {
        console.error("Submission Error:", error);
        return NextResponse.json(
            { error: "Failed to submit application: " + (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const applications = await Application.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ applications }, { status: 200 });
    } catch (error) {
        console.error("Fetch Applications Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}
