import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const path = req.url;
    return NextResponse.json({ path }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const path = await req.json();
    return NextResponse.json(path, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
