import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, nickname } = await req.json();
  if (nickname) return NextResponse.json({ ok: true }); // honeypot
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "");
  if (!valid) return NextResponse.json({ ok: false }, { status: 400 });
  // TODO: integrate provider; for now pretend success
  return NextResponse.json({ ok: true });
}
