import { NextRequest, NextResponse } from "next/server";
import DBclient from "@/lib/db";
import { ObjectId } from "mongodb";

interface ParamInterface {
    noteID: string | ObjectId;
}

export async function GET(req: NextRequest, { params }: { params: ParamInterface }) {
    try {
        const { noteID } = params;

        let objectId;
        try {
            objectId = new ObjectId(noteID);
        } catch (err) {
            return NextResponse.json({ error: "Invalid note ID" }, { status: 400 });
        }

        const db = DBclient.db("notes");
        const collection = db.collection("notes");

        const note = await collection.findOne({ _id: objectId });

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        if (note.visibility === "private") {
            return NextResponse.json({ error: "Note is private" }, { status: 403 });
        }

        return NextResponse.json(note, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}
