"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Mic, MicOff, Video, VideoOff, Send } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/PrimaryButton";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function CallPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [seconds, setSeconds] = useState(0);
  const [balance, setBalance] = useState(0.05);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: "you" | "them" }>>([
    { id: 1, text: "Hey, how are you doing?", sender: "them" },
    { id: 2, text: "I'm doing great, thanks for asking!", sender: "you" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".call-shell",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      gsap.fromTo(
        ".fade-in-headline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.1 }
      );

      gsap.fromTo(
        ".fade-in-subtitle",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".fade-in-button",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
      setBalance((b) => Math.max(0, +(b - 0.0001).toFixed(4)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const endSession = () => {
    router.push("/summary");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "you" as const,
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <Navbar sessionTime={formatTime(seconds)} balance={balance} />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 pt-28 pb-10 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-6xl">
          {/* Video and Chat Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            {/* Video Section - Takes 2 columns on large screens */}
            <section className="call-shell lg:col-span-2 rounded-3xl border border-zinc-900/80 bg-black/40 overflow-hidden">
              <div className="relative w-full bg-gradient-to-b from-zinc-900 via-black to-black aspect-video p-3 sm:p-4">
                <div className="flex h-full items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/40 relative">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Remote Video
                    </span>
                    <p className="max-w-xs text-xs text-zinc-400">
                      Waiting for connection...
                    </p>
                  </div>

                  {/* Self Video PIP */}
                  <div className="absolute bottom-4 right-4 h-24 w-36 rounded-lg border border-zinc-800/80 bg-zinc-950/80 shadow-[0_16px_45px_rgba(0,0,0,0.85)]">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-zinc-600">
                        You
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="border-t border-zinc-900/80 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-4">
                  {/* Media Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMicOn((v) => !v)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        micOn
                          ? "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:bg-zinc-800 hover:border-amber-300/40"
                          : "border-rose-500/60 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30"
                      }`}
                      title={micOn ? "Mute microphone" : "Unmute microphone"}
                    >
                      <span className="sr-only">Toggle microphone</span>
                      {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraOn((v) => !v)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        cameraOn
                          ? "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:bg-zinc-800 hover:border-amber-300/40"
                          : "border-amber-500/60 bg-amber-500/15 text-amber-100 hover:bg-amber-500/25"
                      }`}
                      title={cameraOn ? "Turn off camera" : "Turn on camera"}
                    >
                      <span className="sr-only">Toggle camera</span>
                      {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Status and End Button */}
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-zinc-500">
                      {micOn ? "Mic on" : "Mic muted"} · {cameraOn ? "Camera on" : "Camera off"}
                    </p>
                    <PrimaryButton
                      onClick={endSession}
                      className="fade-in-button bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] text-xs sm:text-sm"
                    >
                      End Session
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </section>

            {/* Chat Section */}
            <section className="call-shell rounded-3xl border border-zinc-900/80 bg-black/40 overflow-hidden flex flex-col h-96 lg:h-auto lg:aspect-auto">
              {/* Chat Header */}
              <div className="border-b border-zinc-900/80 px-4 py-3 sm:px-5">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-400 font-medium">
                  Chat
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-xs break-words ${
                        msg.sender === "you"
                          ? "bg-amber-300/20 text-amber-100 border border-amber-300/30"
                          : "bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-zinc-900/80 px-4 py-3 sm:px-5">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-300/40 focus:bg-zinc-900/70 transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-amber-100 hover:border-amber-300/40 hover:bg-zinc-800 transition-all duration-300"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

