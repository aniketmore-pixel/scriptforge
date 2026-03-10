import React, { useState } from "react";
import { Link } from "react-router-dom"; // Added Link
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Tag, Copy, Check, Loader2, 
  Youtube, ArrowRight, Sparkles, ArrowLeft // Added ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const TagExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    return url.match(regex)?.[1];
  };

  const handleExtract = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setVideoData(data.items[0]);
      } else {
        setError("No video found. It might be private or the link is broken.");
      }
    } catch (err) {
      setError("Failed to fetch tags. Check your API key or connection.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!videoData?.snippet?.tags) return;
    const tagString = videoData.snippet.tags.join(", ");
    navigator.clipboard.writeText(tagString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground font-sans">
      <Navbar />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(0,0,0,0))] pointer-events-none -z-10" />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-24">
        
        {/* BACK BUTTON */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/">
            <Button variant="ghost" className="group text-muted-foreground hover:text-white-200 gap-2 pl-0">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-orange-500 font-bold mb-4"
          >
            <Tag className="w-5 h-5" />
            <span className="tracking-widest uppercase text-sm">
              ScriptForge Tag Extractor
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold font-heading mb-6 tracking-tight">
            Extract Tags
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Paste a YouTube link to reveal the keywords driving its growth.
          </p>

          {/* SEARCH BAR */}
          <form onSubmit={handleExtract} className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-secondary/30 border border-border/50 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-orange-500/40 transition-all">
              <div className="pl-3">
                <Youtube className="w-6 h-6 text-muted-foreground" />
              </div>

              <input
                type="text"
                placeholder="Paste YouTube link here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1 bg-transparent outline-none px-2 text-lg placeholder:text-muted-foreground/50"
              />

              <Button
                type="submit"
                disabled={loading}
                className="group h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">
                    Extract
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
        </div>

        {/* RESULTS AREA */}
        <AnimatePresence mode="wait">
          {videoData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8"
            >
              {/* VIDEO PREVIEW CARD */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 border border-border/50 rounded-3xl p-4 sticky top-32 overflow-hidden">
                  <img
                    src={videoData.snippet.thumbnails.high.url}
                    alt="Thumbnail"
                    className="w-full aspect-video object-cover rounded-2xl mb-4 shadow-xl"
                  />
                  <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                    {videoData.snippet.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {videoData.snippet.channelTitle}
                  </p>
                  <div className="flex gap-4 text-xs font-bold text-orange-500 uppercase tracking-wider">
                    <span>
                      {Number(videoData.statistics.viewCount).toLocaleString()} Views
                    </span>
                  </div>
                </div>
              </div>

              {/* TAGS LIST AREA */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Discovered Keywords
                  </h2>

                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="rounded-full border-orange-500/30 hover:bg-orange-500/10 text-orange-500"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy All Tags"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {videoData.snippet.tags ? (
                    videoData.snippet.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ y: -2 }}
                        className="px-4 py-2 bg-gradient-to-br from-secondary to-secondary/50 border border-border/50 rounded-xl text-sm font-medium hover:border-orange-500/50 transition-colors cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))
                  ) : (
                    <div className="w-full py-12 text-center bg-secondary/20 rounded-3xl border border-dashed border-border">
                      <p className="text-muted-foreground italic">
                        This video has no public tags.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TagExtractor;