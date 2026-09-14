import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  Volume2, 
  Share2, 
  MoreVertical,
  Check,
  Edit3,
  Wifi,
  Zap,
  Sparkles,
  Search,
  Brain,
  Code,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface SaraPhoneMockupProps {
  compact?: boolean;
  className?: string;
}

type SaraMode = 'fast' | 'reason' | 'search';

interface Message {
  id: string;
  sender: 'user' | 'sara';
  text: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    lines: Array<{
      num: number;
      tokens: Array<{ text: string; color: string; bold?: boolean; italic?: boolean }>;
    }>;
  };
  thinkingDuration?: string;
  thinkingSteps?: string[];
  sources?: Array<{ title: string; url: string }>;
}

export const SaraPhoneMockup: React.FC<SaraPhoneMockupProps> = ({ 
  compact = false,
  className = '' 
}) => {
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(true);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, 'like' | 'dislike'>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<SaraMode>('reason');
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial messages matching 100% with the real Sara AI Android app screenshot
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'hlo Sara',
    },
    {
      id: 'msg-2',
      sender: 'sara',
      thinkingDuration: 'Thought for 7 seconds',
      thinkingSteps: [
        '• (1) User wrote "hello Sara" — English greeting.',
        '(2) Current time is 05:05 AM (early morning) Monday. The user didn\'t specify a time-of-day greeting, so no mismatch to correct.',
        '(3) Tone: warm, friendly, short greeting back. User just said hello, so I\'ll greet back naturally and ask what they need.'
      ],
      text: 'Good morning, sir! Happy Monday! How can I help you today?'
    }
  ]);

  const isInitialMount = useRef(true);

  // Smooth Auto-Scroll Handler strictly confined inside the phone container
  const scrollPhoneChatToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Avoid scrolling on initial page load so user's browser window is never hijacked
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      scrollPhoneChatToBottom();
    }, 60);
    return () => clearTimeout(timer);
  }, [messages, isTyping, isThinkingExpanded]);

  // Robust Copy Handler
  const handleCopy = async (textToCopy: string, msgId: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2200);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Like & Dislike Toggle Handler
  const handleReaction = (msgId: string, type: 'like' | 'dislike') => {
    setReactions((prev) => {
      const current = prev[msgId];
      if (current === type) {
        const next = { ...prev };
        delete next[msgId];
        return next;
      }
      return { ...prev, [msgId]: type };
    });
  };

  // Text-To-Speech SpeechSynthesis Audio Handler
  const handleSpeak = (text: string, msgId: string) => {
    if (playingAudioId === msgId) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingAudioId(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown backticks before speaking
      const cleanText = text.replace(/```[\s\S]*?```/g, 'Code snippet provided.').replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingAudioId(msgId);
    } else {
      // Visual fallback
      setPlayingAudioId(msgId);
      setTimeout(() => setPlayingAudioId(null), 4000);
    }
  };

  // Python Code Sample Generator
  const getPythonScriptResponse = (): {
    text: string;
    thinkingDuration: string;
    thinkingSteps: string[];
    codeSnippet: Message['codeSnippet'];
  } => {
    return {
      thinkingDuration: 'Thought for 6 seconds',
      thinkingSteps: [
        '• Code request recognized: Python script with clean structure, async support, and type safety.',
        '• Formulating production-grade Python solution with logging, typing, and cognitive execution.',
        '• Applying PEP-8 idiomatic formatting, docstrings, and robust error handling.'
      ],
      text: 'Here is a clean, production-ready Python script built with modern asynchronous execution and typed interfaces:',
      codeSnippet: {
        filename: 'sara_neural_agent.py',
        language: 'python',
        code: `import asyncio
import logging
from typing import Dict, Any, List
from dataclasses import dataclass

# SARA AI Cognitive Engine v1.0
logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")

@dataclass
class CognitiveState:
    session_id: str
    tokens_processed: int
    active_mode: str = "deep_reasoner"

class SaraAgent:
    """Autonomous companion agent engineered by Aryan Hawari."""
    def __init__(self, agent_name: str = "SARA"):
        self.name = agent_name
        self.memory: List[Dict[str, Any]] = []

    async def reason(self, prompt: str) -> Dict[str, Any]:
        logging.info(f"Deconstructing prompt: '{prompt}'")
        await asyncio.sleep(0.15)  # Simulated neural pipeline
        return {
            "status": "success",
            "mode": "hybrid_reasoning",
            "solution": f"Processed '{prompt}' with zero hallucinations."
        }

async def main():
    agent = SaraAgent()
    result = await agent.reason("Optimizing 6.8\\" AMOLED viewport")
    print(f"\\033[92m[SARA RESULT]\\033[0m: {result['solution']}")

if __name__ == "__main__":
    asyncio.run(main())`,
        lines: [
          {
            num: 1,
            tokens: [
              { text: 'import', color: 'text-fuchsia-400 font-semibold' },
              { text: ' asyncio', color: 'text-zinc-200' }
            ]
          },
          {
            num: 2,
            tokens: [
              { text: 'import', color: 'text-fuchsia-400 font-semibold' },
              { text: ' logging', color: 'text-zinc-200' }
            ]
          },
          {
            num: 3,
            tokens: [
              { text: 'from', color: 'text-fuchsia-400 font-semibold' },
              { text: ' typing ', color: 'text-zinc-200' },
              { text: 'import', color: 'text-fuchsia-400 font-semibold' },
              { text: ' Dict, Any, List', color: 'text-cyan-300' }
            ]
          },
          {
            num: 4,
            tokens: [
              { text: 'from', color: 'text-fuchsia-400 font-semibold' },
              { text: ' dataclasses ', color: 'text-zinc-200' },
              { text: 'import', color: 'text-fuchsia-400 font-semibold' },
              { text: ' dataclass', color: 'text-cyan-300' }
            ]
          },
          {
            num: 5,
            tokens: [
              { text: '# SARA AI Cognitive Engine v1.0 (Aryan Hawari Architecture)', color: 'text-zinc-500 italic' }
            ]
          },
          {
            num: 6,
            tokens: [
              { text: '@dataclass', color: 'text-amber-400 font-mono' }
            ]
          },
          {
            num: 7,
            tokens: [
              { text: 'class', color: 'text-fuchsia-400 font-semibold' },
              { text: ' CognitiveState', color: 'text-yellow-300 font-bold' },
              { text: ':', color: 'text-zinc-300' }
            ]
          },
          {
            num: 8,
            tokens: [
              { text: '    session_id: ', color: 'text-zinc-300' },
              { text: 'str', color: 'text-cyan-300 font-mono' }
            ]
          },
          {
            num: 9,
            tokens: [
              { text: '    active_mode: ', color: 'text-zinc-300' },
              { text: 'str', color: 'text-cyan-300 font-mono' },
              { text: ' = ', color: 'text-fuchsia-400' },
              { text: '"deep_reasoner"', color: 'text-emerald-400' }
            ]
          },
          {
            num: 10,
            tokens: [
              { text: 'class', color: 'text-fuchsia-400 font-semibold' },
              { text: ' SaraAgent', color: 'text-yellow-300 font-bold' },
              { text: ':', color: 'text-zinc-300' }
            ]
          },
          {
            num: 11,
            tokens: [
              { text: '    async def ', color: 'text-fuchsia-400 font-semibold' },
              { text: 'reason', color: 'text-amber-300 font-bold' },
              { text: '(self, prompt: ', color: 'text-zinc-300' },
              { text: 'str', color: 'text-cyan-300' },
              { text: ') -> ', color: 'text-fuchsia-400' },
              { text: 'Dict', color: 'text-cyan-300' },
              { text: '[', color: 'text-zinc-400' },
              { text: 'str', color: 'text-cyan-300' },
              { text: ', ', color: 'text-zinc-400' },
              { text: 'Any', color: 'text-cyan-300' },
              { text: ']:', color: 'text-zinc-300' }
            ]
          },
          {
            num: 12,
            tokens: [
              { text: '        await ', color: 'text-fuchsia-400 font-semibold' },
              { text: 'asyncio.sleep(', color: 'text-zinc-200' },
              { text: '0.15', color: 'text-orange-300' },
              { text: ')', color: 'text-zinc-200' }
            ]
          },
          {
            num: 13,
            tokens: [
              { text: '        return', color: 'text-fuchsia-400 font-semibold' },
              { text: ' {', color: 'text-zinc-300' },
              { text: '"status"', color: 'text-emerald-400' },
              { text: ': ', color: 'text-zinc-400' },
              { text: '"verified"', color: 'text-emerald-400' },
              { text: ', ', color: 'text-zinc-400' },
              { text: '"output"', color: 'text-emerald-400' },
              { text: ': ', color: 'text-zinc-400' },
              { text: 'f"Solved: {prompt}"', color: 'text-emerald-300' },
              { text: '}', color: 'text-zinc-300' }
            ]
          }
        ]
      }
    };
  };

  // Send & AI Response Handler
  const handleSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputVal.trim();
    if (!textToSend) return;

    setInputVal('');

    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text: textToSend }
    ]);

    setIsTyping(true);

    // Contextual, natural human-like AI responses
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let newMsg: Partial<Message> = {};

      if (lower.includes('python') || lower.includes('script') || lower.includes('code')) {
        const scriptData = getPythonScriptResponse();
        newMsg = {
          thinkingDuration: scriptData.thinkingDuration,
          thinkingSteps: scriptData.thinkingSteps,
          text: scriptData.text,
          codeSnippet: scriptData.codeSnippet
        };
      } else if (lower.includes('aryan') || lower.includes('hawari') || lower.includes('creator') || lower.includes('founder')) {
        newMsg = {
          thinkingDuration: 'Thought for 4 seconds',
          thinkingSteps: [
            '• Query identified: Biography and identity of Aryan Hawari.',
            '• Accessing verified engineering registry and creator background.',
            '• Synthesizing a warm, human, respectful explanation of his vision for Nepal & AI innovation.'
          ],
          text: `Aryan Hawari is a developer from Nepal who built SARA AI.\n\nHis goal: fast, lightweight AI that everyone can use — with deep reasoning, live search and clean mobile design.`
        };
      } else if (lower.includes('how') && (lower.includes('think') || lower.includes('thought') || lower.includes('work') || lower.includes('reason'))) {
        newMsg = {
          thinkingDuration: 'Thought for 5 seconds',
          thinkingSteps: [
            '• Explaining cognitive pipeline: Deconstructing dual-system cognitive architecture.',
            '• Outlining System 1 (Instant intuitive inference) vs System 2 (Step-by-step deliberative reasoning).',
            '• Articulating how self-critique and citation grounding eradicate hallucinations.'
          ],
          text: `I think in 3 modes:\n\n1. Fast: instant replies for simple questions.\n\n2. Deep Reasoner: step-by-step for code and hard problems.\n\n3. Search: live web answers with sources.\n\nTap my Thought header to see reasoning.`
        };
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('sara')) {
        newMsg = {
          thinkingDuration: 'Thought for 2 seconds',
          thinkingSteps: [
            '• Warm greeting detected.',
            '• Formulating natural, friendly response.'
          ],
          text: `Hello! I am SARA AI. I can help with code, study, planning or live search. What do you need?`
        };
      } else {
        newMsg = {
          thinkingDuration: `Thought for 3 seconds (${activeMode.toUpperCase()} mode)`,
          thinkingSteps: [
            `• User input: "${textToSend}"`,
            `• Routing through ${activeMode.toUpperCase()} inference engine.`,
            '• Synthesizing structured, helpful response.'
          ],
          text: `Got it — "${textToSend}". I can explain, write code or search the web. How should I help?`
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `sara-${Date.now()}`,
          sender: 'sara',
          text: newMsg.text || '',
          codeSnippet: newMsg.codeSnippet,
          thinkingDuration: newMsg.thinkingDuration,
          thinkingSteps: newMsg.thinkingSteps,
          sources: newMsg.sources
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div 
      className={`relative mx-auto select-none transition-all duration-300 w-full ${
        compact 
          ? 'max-w-[240px] sm:max-w-[265px]' 
          : 'max-w-[255px] sm:max-w-[300px] md:max-w-[330px]'
      } ${className}`}
    >
      
      {/* Ambient Aura */}
      <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-b from-red-500/15 via-orange-300/10 to-transparent rounded-[44px] sm:rounded-[56px] blur-2xl sm:blur-3xl -z-10 opacity-80 pointer-events-none" />

      {/* Device Chassis (Titanium rim, precise proportions) */}
      <div className="relative rounded-[38px] sm:rounded-[46px] bg-[#0c0d12] p-2 sm:p-3 border-[2px] sm:border-[2.5px] border-[#363842] shadow-[0_20px_60px_-15px_rgba(48,34,22,0.35),0_10px_25px_-8px_rgba(212,49,34,0.18)] ring-1 ring-white/10">
        
        {/* Hardware side keys with metallic beveling */}
        <div className="absolute -left-[4px] sm:-left-[5px] top-24 sm:top-28 w-[3px] sm:w-[3.5px] h-9 sm:h-11 bg-gradient-to-r from-[#52525b] to-[#27272a] rounded-l shadow-sm" />
        <div className="absolute -left-[4px] sm:-left-[5px] top-36 sm:top-42 w-[3px] sm:w-[3.5px] h-9 sm:h-11 bg-gradient-to-r from-[#52525b] to-[#27272a] rounded-l shadow-sm" />
        <div className="absolute -right-[4px] sm:-right-[5px] top-28 sm:top-32 w-[3px] sm:w-[3.5px] h-12 sm:h-14 bg-gradient-to-l from-[#52525b] to-[#27272a] rounded-r shadow-sm" />

        {/* Antenna bands */}
        <div className="absolute top-10 left-0 w-[2px] h-2 bg-[#52525b]/50" />
        <div className="absolute top-10 right-0 w-[2px] h-2 bg-[#52525b]/50" />
        <div className="absolute bottom-14 left-0 w-[2px] h-2 bg-[#52525b]/50" />
        <div className="absolute bottom-14 right-0 w-[2px] h-2 bg-[#52525b]/50" />

        {/* Edge-to-Edge AMOLED Screen */}
        <div 
          className={`relative rounded-[30px] sm:rounded-[38px] bg-black overflow-hidden flex flex-col ${
            compact ? 'h-[440px] sm:h-[480px]' : 'h-[470px] sm:h-[540px] md:h-[570px]'
          } border border-black text-white font-sans shadow-inner`}
        >

          {/* Glass reflection sheen — subtle premium realism */}
          <div
            className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.025] to-white/[0.055]"
            aria-hidden="true"
          />
          
          {/* Top Hardware Micro Speaker Slit */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#27272a] rounded-full z-30 pointer-events-none opacity-80" />

          {/* Android 15 Status Bar matching screenshot 100% */}
          <div className="pt-3 px-5 pb-1 flex items-center justify-between text-[11px] text-[#a1a1aa] font-medium tracking-tight bg-black z-20">
            <span className="font-semibold text-white tracking-normal text-xs">5:06</span>
            
            {/* Front Camera Punch-Hole with subtle optical lens depth */}
            <div className="relative w-3 h-3 rounded-full bg-[#0a0a0c] border border-[#27272a] flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1e1b4b]/60" />
            </div>

            {/* Right status icons */}
            <div className="flex items-center gap-2 text-[10px] text-white font-medium">
              {/* Speed indicator */}
              <div className="flex flex-col items-center leading-none text-[8px] font-mono text-white/90">
                <span className="font-bold">49.0</span>
                <span className="text-[7px] text-[#a1a1aa]">KB/S</span>
              </div>

              {/* VoLTE / WiFi icon */}
              <Wifi className="w-3.5 h-3.5 text-white" />
              
              {/* 4-bar Signal bars */}
              <div className="flex items-end gap-[1.5px] h-3">
                <div className="w-[2px] h-1.5 bg-white rounded-xs" />
                <div className="w-[2px] h-2 bg-white rounded-xs" />
                <div className="w-[2px] h-2.5 bg-white rounded-xs" />
                <div className="w-[2px] h-3 bg-white rounded-xs" />
              </div>

              {/* Battery indicator */}
              <div className="flex items-center gap-0.5 border border-white/80 rounded-[4px] px-1 py-[0.5px] text-[9px] font-mono leading-none">
                <span className="font-bold">36</span>
                <Zap className="w-2.5 h-2.5 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* SARA AI app header */}
          <div className="px-4 py-2.5 flex items-center justify-between bg-black z-10">
            {/* Left Button: Circular dark button with two horizontal bars */}
            <button 
              type="button"
              className="w-10 h-10 rounded-full bg-[#181820] border border-white/5 flex flex-col items-center justify-center gap-[4.5px] hover:bg-[#23232c] transition-colors cursor-pointer"
              title="Menu"
            >
              <span className="w-4 h-[2px] bg-white rounded-full" />
              <span className="w-4 h-[2px] bg-white rounded-full" />
            </button>

            {/* Center: Clean black space (as in authentic screenshot) */}
            <div className="flex-1" />

            {/* Right: Rounded pill container with Notepad Edit and 3 Dots */}
            <div className="h-10 rounded-full bg-[#181820] border border-white/5 px-3.5 flex items-center gap-3.5">
              <button 
                type="button" 
                onClick={() => {
                  setMessages([
                    {
                      id: 'msg-1',
                      sender: 'user',
                      text: 'hlo Sara',
                    },
                    {
                      id: 'msg-2',
                      sender: 'sara',
                      thinkingDuration: 'Thought for 7 seconds',
                      thinkingSteps: [
                        '• (1) User wrote "hello Sara" — English greeting.',
                        '(2) Current time is 05:05 AM (early morning) Monday. The user didn\'t specify a time-of-day greeting, so no mismatch to correct.',
                        '(3) Tone: warm, friendly, short greeting back. User just said hello, so I\'ll greet back naturally and ask what they need.'
                      ],
                      text: 'Good morning, sir! Happy Monday! How can I help you today?'
                    }
                  ]);
                }}
                className="text-white hover:text-neutral-300 transition-colors cursor-pointer" 
                title="New Chat Session"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                className="text-white hover:text-neutral-300 transition-colors cursor-pointer" 
                title="Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Conversation Scroll Area */}
          <div 
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar bg-black scroll-smooth"
          >
            
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  /* Emerald green user bubble */
                  <div key={msg.id} className="flex justify-end">
                    <div className="bg-[#008060] text-white px-4 py-2.5 rounded-[22px] text-[14px] sm:text-[15px] font-normal leading-snug max-w-[85%] shadow-sm select-text">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              const isLiked = reactions[msg.id] === 'like';
              const isDisliked = reactions[msg.id] === 'dislike';
              const isCopied = copiedMsgId === msg.id;
              const isSpeaking = playingAudioId === msg.id;

              return (
                /* SARA AI Response Block with Expandable Thought */
                <div key={msg.id} className="space-y-3">
                  
                  {/* Expandable Thinking Dropdown matching image.png */}
                  {msg.thinkingDuration && (
                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                        className="flex items-center gap-1 text-[#8e8e93] hover:text-[#d1d5db] text-[13.5px] font-normal transition-colors cursor-pointer"
                      >
                        <span>{msg.thinkingDuration}</span>
                        {isThinkingExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-[#8e8e93]" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-[#8e8e93]" />
                        )}
                      </button>

                      {/* Thinking Reasoning Trace matching screenshot */}
                      <AnimatePresence>
                        {isThinkingExpanded && msg.thinkingSteps && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-l border-[#374151] pl-3 py-1 space-y-1.5 text-[#9ca3af] text-[12.5px] leading-relaxed font-normal"
                          >
                            {msg.thinkingSteps.map((step, idx) => (
                              <p key={idx} className="font-normal text-left whitespace-pre-line">
                                {step}
                              </p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* SARA Main Response Text */}
                  <div className="text-white text-[15px] sm:text-[15.5px] leading-relaxed font-normal whitespace-pre-wrap select-text pt-0.5">
                    {msg.text}
                  </div>

                  {/* High-Fidelity Color-Coded Syntax Highlighted Code Viewer */}
                  {msg.codeSnippet && (
                    <div className="my-3 rounded-2xl overflow-hidden border border-[#27272a] bg-[#090a0f] shadow-lg">
                      {/* Window titlebar with macOS dots & copy button */}
                      <div className="px-3.5 py-2 bg-[#12131a] border-b border-[#27272a] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/90" />
                          </div>
                          <span className="text-[11px] font-mono text-[#a1a1aa] ml-1.5 flex items-center gap-1">
                            <Code className="w-3 h-3 text-red-500" />
                            {msg.codeSnippet.filename}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopy(msg.codeSnippet?.code || '', `code-${msg.id}`)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f2029] hover:bg-[#272935] text-[10px] font-mono text-[#e4e4e7] transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {copiedMsgId === `code-${msg.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#a1a1aa]" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code body with syntax colored tokens & line numbers */}
                      <div className="p-3 font-mono text-[11px] sm:text-[11.5px] leading-5 overflow-x-auto select-text no-scrollbar">
                        {msg.codeSnippet.lines.map((line) => (
                          <div key={line.num} className="flex hover:bg-white/[0.02] px-1 rounded">
                            <span className="w-6 text-right pr-3 text-[#52525b] select-none text-[10px]">
                              {line.num}
                            </span>
                            <div className="flex-1 whitespace-pre">
                              {line.tokens.map((token, tIdx) => (
                                <span key={tIdx} className={token.color}>
                                   {token.text}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Code footer bar with run guide */}
                      <div className="px-3.5 py-1.5 bg-[#0e0f14] border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a] font-mono">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-emerald-400" />
                          python -m asyncio sara_neural_agent.py
                        </span>
                        <span className="text-emerald-400 font-semibold">● Verified Syntax</span>
                      </div>
                    </div>
                  )}

                  {/* Action Icons Row (Copy, ThumbsUp, ThumbsDown, Speaker, Share, More) matching screenshot 100% */}
                  <div className="flex items-center gap-4 text-[#8e8e93] pt-1">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(msg.text + (msg.codeSnippet ? `\n\n${msg.codeSnippet.code}` : ''), msg.id)}
                      title="Copy response"
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => handleReaction(msg.id, 'like')}
                      title="Helpful"
                      className={`hover:text-white transition-colors cursor-pointer ${
                        isLiked ? 'text-emerald-400' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-emerald-400/20' : ''}`} />
                    </button>

                    {/* Dislike Button */}
                    <button
                      onClick={() => handleReaction(msg.id, 'dislike')}
                      title="Not helpful"
                      className={`hover:text-white transition-colors cursor-pointer ${
                        isDisliked ? 'text-rose-400' : ''
                      }`}
                    >
                      <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-rose-400/20' : ''}`} />
                    </button>

                    {/* Speech / Audio playback */}
                    <button 
                      onClick={() => handleSpeak(msg.text, msg.id)}
                      title="Listen to SARA voice" 
                      className={`hover:text-white transition-colors cursor-pointer ${
                        isSpeaking ? 'text-red-400' : ''
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Share Button */}
                    <button 
                      onClick={() => handleCopy(window.location.href, `share-${msg.id}`)}
                      title="Share link" 
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* More Options Button */}
                    <button 
                      type="button"
                      title="More options" 
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}

            {/* SARA is typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#a1a1aa] py-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="font-mono text-[11px]">SARA is thinking & synthesizing...</span>
                <div className="flex items-center gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce delay-200" />
                </div>
              </div>
            )}

            {/* Bottom scroll target */}
            <div ref={messagesEndRef} className="h-1" />

          </div>

          {/* Bottom Bar: Pill input with '+' and green waveform button matching image.png 100% */}
          <div className="px-3 pb-3 pt-1 bg-black">
            <form 
              onSubmit={handleSend}
              className="h-12 rounded-full bg-[#181820] border border-white/5 px-4 flex items-center justify-between gap-2.5"
            >
              {/* Left: Plus icon */}
              <button 
                type="button" 
                onClick={() => handleSend(undefined, 'Write a python script')}
                className="text-white hover:text-neutral-300 transition-colors flex-shrink-0 cursor-pointer"
                title="Attach / Quick Prompt"
              >
                <Plus className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Middle: Input field with authentic 'Reply to Sara AI' placeholder */}
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Reply to Sara AI"
                className="w-full bg-transparent text-[14px] sm:text-[14.5px] text-white placeholder-[#71717a] focus:outline-none px-1 font-normal"
              />

              {/* Right: Emerald Voice Waveform / Send Button */}
              <button
                type={inputVal.trim() ? 'submit' : 'button'}
                onClick={inputVal.trim() ? undefined : () => handleSend(undefined, 'hlo Sara')}
                className="w-9 h-9 rounded-full bg-[#00a86b] hover:bg-[#00b875] text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-sm cursor-pointer"
                title="Send / Voice"
              >
                {inputVal.trim() ? (
                  <Zap className="w-4 h-4 fill-white" />
                ) : (
                  <div className="flex items-center gap-[2.5px] h-4">
                    <span className="w-[2px] h-2 bg-white rounded-full" />
                    <span className="w-[2px] h-3.5 bg-white rounded-full" />
                    <span className="w-[2px] h-4 bg-white rounded-full" />
                    <span className="w-[2px] h-2.5 bg-white rounded-full" />
                  </div>
                )}
              </button>
            </form>

            {/* Android Navigation Gesture handle */}
            <div className="w-28 h-1 rounded-full bg-white/40 mx-auto mt-2.5" />
          </div>

        </div>

      </div>

      {/* Interactive Quick Prompts (wired to the live phone chat) */}
      <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 px-2">
        {[
          { label: 'Write a python script', icon: <Sparkles className="w-3 h-3 text-red-500" /> },
          { label: 'Who is Aryan Hawari?', icon: null },
          { label: 'How does SARA think?', icon: null }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => {
              handleSend(undefined, item.label);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-neutral-700 hover:text-red-600 bg-white/85 hover:bg-white border border-white/90 hover:border-red-300 backdrop-blur-md transition-all shadow-sm cursor-pointer active:scale-95"
          >
            {item.icon}
            <span>"{item.label}"</span>
          </button>
        ))}
      </div>

    </div>
  );
};
