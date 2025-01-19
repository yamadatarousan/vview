import { NextResponse } from 'next/server';

// const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_KEY = 'AIzaSyBLXEqBQx_wREikE9urQSZ-LHNa5krE5DE';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) {
    return NextResponse.json(
      { error: 'Missing channelId parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
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