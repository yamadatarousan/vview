import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//const API_KEY = process.env.YOUTUBE_API_KEY; // .env.localにAPIキーを保存
const API_KEY = 'AIzaSyBLXEqBQx_wREikE9urQSZ-LHNa5krE5DE'; // .env.localにAPIキーを保存

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const query = req.query.q as string || "ゲーム実況"; // 検索キーワード

  try {
    // ライブ配信中の動画を検索
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          eventType: "live",
          type: "video",
          q: query,
          maxResults: 5,
          key: API_KEY,
        },
      }
    );

    const videoIds = searchResponse.data.items.map(
      (item: any) => item.id.videoId
    );

    if (videoIds.length === 0) {
      res.status(200).json([]);
      return;
    }

    // 動画の詳細情報を取得
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,liveStreamingDetails",
          id: videoIds.join(","),
          key: API_KEY,
        },
      }
    );

    res.status(200).json(detailsResponse.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from YouTube API" });
  }
}
