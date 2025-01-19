"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/youtube`, {
          params: { q: query },
        });
        setLiveStreams(response.data);
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
              <p>開始時刻: {new Date(stream.liveStreamingDetails.actualStartTime).toLocaleString()}</p>
              <a
                href={`https://www.youtube.com/watch?v=${stream.id}`}
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
