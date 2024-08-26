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

export async function PUT(req: NextRequest, { params }: { params: paramInterface }) {
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

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();
        let {type, data} = body;

        if (type === "twitter" || type === "github" || type === "linkedin") {
            if (data.startsWith("https://") || data.startsWith("http://")) {
                const arr = data.split("//");

                if (type == "twitter" || type == "github") {
                    data = arr[1].split("/")[1];
                } else if (type == "linkedin") {
                    data = arr[1].split("/")[2];
                }
            }
        }

        await collection.updateOne({ _id: objectId }, { $set: {[type]: data} }, { upsert: true });

        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
    }
}