import { NextRequest, NextResponse } from "next/server";
import DBclient from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

interface ParamInterface {
    noteID: string | ObjectId;
    content: string;
}

interface NoteInterface {
    content: string;
    editorID: string;
    title: string;
}

export async function GET(req: NextRequest, { params }: { params: ParamInterface }) {
    try {
        const { noteID } = params;
        const session = await auth();

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

        if (note.visibility === "private" && session?.user.id !== note.creatorID.toString()) {
            return NextResponse.json({ error: "Note is private" }, { status: 403 });
        }

        return NextResponse.json(note, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: ParamInterface }) {
    try {
        const { noteID } = params;
        const { content, editorID, title }: NoteInterface = await req.json();

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

        if (note.creatorID.toString() !== editorID) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await collection.updateOne({ _id: objectId }, { $set: {body: content, title} }, { upsert: true });

        return NextResponse.json({ message: "Note updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
    }
}