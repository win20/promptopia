import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;

  try{
    const response = await fetch(`http://localhost:3000/api/revalidate?tag=prompt&secret=${secret}`, {
      method: 'POST'
    });

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (e) {
    return NextResponse.json({
      message: e,
    }, {
      status: 400,
    });
  }
}