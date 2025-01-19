import { NextResponse } from 'next/server';

// const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_KEY = 'AIzaSyBLXEqBQx_wREikE9urQSZ-LHNa5krE5DE';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

// https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=8Qiap7rchwY&key=AIzaSyBLXEqBQx_wREikE9urQSZ-LHNa5krE5DE

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=liveStreamingDetails&id=${id}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}