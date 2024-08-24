import { NextRequest, NextResponse } from "next/server";
import DBclient from "@/lib/db";
import { ObjectId } from "mongodb";

interface paramInterface {
    userID: string | ObjectId;
}

interface RequestInterface {
    title: string;
    body: string;
    visibility: string;
    "bg_color": string;
}

export async function GET(req: NextRequest, { params }: { params: paramInterface }) {
    try {
        const { userID } = params;
        const public_only = req.nextUrl.searchParams.get("public_only");

        const db = DBclient.db("notes");
        const collection = db.collection("notes");

        const objectId = typeof userID === "string" ? new ObjectId(userID) : userID;

        if (public_only) {
            const notes = await collection.find({ creatorID: objectId, visibility: "public" }).toArray();
            return NextResponse.json({ userID: objectId.toString(), notes }, { status: 200 });
        }

        const notes = await collection.find({ creatorID: objectId }).toArray();

        return NextResponse.json({ userID: objectId.toString(), notes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes"}, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: paramInterface }) {
    try {
        const { userID } = params;
        const db = DBclient.db("notes");
        const collection = db.collection("notes");

        const objectId = typeof userID === "string" ? new ObjectId(userID) : userID;

        const { title, body, visibility, bg_color }: RequestInterface = await req.json();

        const result = await collection.insertOne({ creatorID: objectId, visibility, title, body, "bg-color": bg_color});

        return NextResponse.json({ note: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
    }
}