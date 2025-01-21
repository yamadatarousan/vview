"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stream } from "stream";

const people = [
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

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
        if(liveResponse.data.items.length === 0) {
            setError(null);
            return
        }
        console.log("setLiveStreams")
        console.log(query)
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
        <div className="bg-white">
            <div className="mx-auto grid max-w-7xl gap-20 xl:grid-cols-3">
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {liveStreams.map((stream) => (
                    <li key={stream.id}>
                    <div className="items-center gap-x-6">
                        <a
                            href={`https://www.youtube.com/watch?v=${stream.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img alt="" src={stream.snippet.thumbnails.medium.url} className="" />
                        </a>
                        <div>
                            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{stream.snippet.title}</h3>
                            <p className="text-sm/6 font-semibold text-indigo-600">{stream.concurrentViewers}人が視聴中</p>
                            <p className="text-sm/6 font-semibold text-indigo-600">{new Date(stream.snippet.publishTime).toLocaleString()}&nbsp;に開始</p>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default LiveStreams;
