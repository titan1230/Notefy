import { NextRequest, NextResponse } from "next/server";
import DBclient from "@/lib/db";
import { ObjectId } from "mongodb";

interface paramInterface {
    userID: string | ObjectId;
}

export async function GET(req: NextRequest, { params }: { params: paramInterface }) {
    try {
        const { userID } = params;
        const db = DBclient.db("users");
        const collection = db.collection("users");

        let objectId;
        try {
            objectId = new ObjectId(userID);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const userData = await collection.findOne({ _id: objectId })

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}