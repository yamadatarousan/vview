"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stream } from "stream";

interface LiveStream {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
  };
  liveStreamingDetails: {
    actualStartTime: string;
  };
}

const LiveStreams: React.FC<{ query: string }> = ({ query }) => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        setLoading(true);
        const liveResponse = await axios.get(`/api/youtube/live`, {
          params: { channelId: query },
        });
        console.log("setLiveStreams")
        console.log(liveResponse.data)
        const videoId = liveResponse.data.items[0].id.videoId
        const videoRsponse = await axios.get(`/api/youtube/video`, {
            params: { id: videoId },
        });
        console.log(videoRsponse.data)
        liveResponse.data.items[0].concurrentViewers
        = videoRsponse.data.items[0].liveStreamingDetails.concurrentViewers
        console.log(liveResponse.data)
        // const liveDetailsResponse = liveResponse.data.items.map((stream) => (
        //     stream.video = await axios.get(`/api/youtube/video`, {
        //         params: { channelId: query },
        //     });
        //     return stream
        // });
        // response.data.video = video;
        // const withTax = liveResponse.data.items.map((item) => {
        //     item.video await axios.get(`/api/youtube/video`, {
        //         params: { videoId: item.id.videoId },
        //     });
        //   return item
        // });
        setLiveStreams(liveResponse.data.items);
        setError(null);
      } catch (err) {   
        console.error(err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStreams();
  }, [query]);

  if (loading) return <p>ロード中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>ライブ配信情報</h1>
      {liveStreams.length === 0 ? (
        <p>現在ライブ配信はありません。</p>
      ) : (
        <ul>
          {liveStreams.map((stream) => (
            <li key={stream.id}>
              <h2>{stream.snippet.title}</h2>
              <p>配信者: {stream.snippet.channelTitle}</p>
              <p>開始時刻: {new Date(stream.snippet.publishTime).toLocaleString()}</p>
              <p>視聴者数: {stream.concurrentViewers}</p>
              <a
                href={`https://www.youtube.com/watch?v=${stream.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                視聴する
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveStreams;
