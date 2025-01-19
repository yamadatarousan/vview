import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This is a GET request' });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'This is a POST request', data: body });
}

export async function DELETE() {
  return NextResponse.json({ message: 'This is a DELETE request' });
}