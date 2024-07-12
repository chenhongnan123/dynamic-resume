import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = {a: 1}
    return NextResponse.json(res)
  } catch (e) {
    return NextResponse.json({ error: "failed to get user" }, { status: 500 });
  }
}