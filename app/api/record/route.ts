import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const path = await req.json();
    return NextResponse.json(path, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: error }, { status: 500 });
  }
}
