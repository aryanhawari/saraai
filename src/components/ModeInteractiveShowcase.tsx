import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Brain,
  Globe,
  Check,
  Play,
  RefreshCw,
  ExternalLink,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Sparkles,
  Terminal,
  Send,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { saraModes } from '../data/modes';
import { ModeItem } from '../types';
import { SectionHeader } from './SectionHeader';

interface DemoContent {
  query: string;
  thoughtSteps?: string[];
  response: string;
  codeSnippet?: {
    filename: string;
    code: string;
    language: string;
    lines: Array<{
      num: number;
      tokens: Array<{ text: string; color: string }>;
    }>;
  };
  citations?: Array<{ title: string; url: string; time: string }>;
  telemetry: {
    latency: string;
    tokens: string;
    confidence: string;
  };
}

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const ModeInteractiveShowcase: React.FC = () => {
  const [selectedModeId, setSelectedModeId] = useState<'fast' | 'thinker' | 'search'>('thinker');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedState, setCopiedState] = useState(false);
  const [likedState, setLikedState] = useState<'like' | 'dislike' | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Mode Icon dictionary
  const modeIcon = {
    fast: Zap,
    thinker: Brain,
    search: Globe
  };

  // Curated Preset Scenarios for each mode
  const scenarios: Record<string, Record<string, DemoContent>> = {
    thinker: {
      default: {
        query: 'Dijkstra vs A* — which is faster?',
        thoughtSteps: [
          'Comparing graph models.',
          'Checking O((V + E) log V) complexity.',
          'Evaluating heuristic pruning.',
          'Writing clean Python example.'
        ],
        response: `Dijkstra explores evenly — O((V + E) log V). A* adds a heuristic to focus search, cutting nodes by up to 80% on grids while staying optimal.\n\nExample:`,
        codeSnippet: {
          filename: 'astar_search.py',
          language: 'python',
          code: `import heapq

def a_star(graph, start, goal, h):
    # Priority queue stores (f_score, current_node)
    open_set = [(h(start, goal), 0, start, [start])]
    visited = {}

    while open_set:
        f, g, current, path = heapq.heappop(open_set)
        if current == goal:
            return path, g
        if current in visited and visited[current] <= g:
            continue
        visited[current] = g

        for neighbor, weight in graph.get(current, []):
            new_g = g + weight
            new_f = new_g + h(neighbor, goal)
            heapq.heappush(open_set, (new_f, new_g, neighbor, path + [neighbor]))

    return None, float('inf')`,
          lines: [
            {
              num: 1,
              tokens: [
                { text: 'import', color: 'text-fuchsia-400 font-semibold' },
                { text: ' heapq', color: 'text-zinc-200' }
              ]
            },
            {
              num: 2,
              tokens: []
            },
            {
              num: 3,
              tokens: [
                { text: 'def', color: 'text-fuchsia-400 font-semibold' },
                { text: ' a_star', color: 'text-amber-300 font-bold' },
                { text: '(graph, start, goal, h):', color: 'text-zinc-200' }
              ]
            },
            {
              num: 4,
              tokens: [
                { text: '    # Priority queue stores (f_score, g_score, node, path)', color: 'text-zinc-500 italic' }
              ]
            },
            {
              num: 5,
              tokens: [
                { text: '    open_set = [(h(start, goal), ', color: 'text-zinc-200' },
                { text: '0', color: 'text-orange-300' },
                { text: ', start, [start])]', color: 'text-zinc-200' }
              ]
            },
            {
              num: 6,
              tokens: [
                { text: '    visited = {}', color: 'text-zinc-200' }
              ]
            },
            {
              num: 7,
              tokens: []
            },
            {
              num: 8,
              tokens: [
                { text: '    while', color: 'text-fuchsia-400 font-semibold' },
                { text: ' open_set:', color: 'text-zinc-200' }
              ]
            },
            {
              num: 9,
              tokens: [
                { text: '        f, g, current, path = heapq.heappop(open_set)', color: 'text-zinc-200' }
              ]
            },
            {
              num: 10,
              tokens: [
                { text: '        if', color: 'text-fuchsia-400 font-semibold' },
                { text: ' current == goal:', color: 'text-zinc-200' }
              ]
            },
            {
              num: 11,
              tokens: [
                { text: '            return', color: 'text-fuchsia-400 font-semibold' },
                { text: ' path, g', color: 'text-emerald-400' }
              ]
            }
          ]
        },
        telemetry: {
          latency: '420ms',
          tokens: '384 tokens',
          confidence: '99.8%'
        }
      },
      aryan: {
        query: 'Who built SARA AI?',
        thoughtSteps: [
          'Checking creator profile.',
          'Summarizing vision briefly.',
        ],
        response: `Aryan Hawari from Nepal built SARA AI — fast, lightweight AI for everyone.`,
        telemetry: {
          latency: '310ms',
          tokens: '290 tokens',
          confidence: '100%'
        }
      }
    },
    fast: {
      default: {
        query: 'Everest in 2 sentences?',
        response: `Everest (Sagarmatha) is Nepal's pride and a global mountaineering icon. It drives tourism and Sherpa culture.`,
        telemetry: {
          latency: '118ms',
          tokens: '92 tokens',
          confidence: '99.5%'
        }
      },
      casual: {
        query: 'Quick productive morning plan?',
        response: `1. 07:00 — Move + hydrate.\n2. 07:30 — 90 min deep work.\n3. 09:00 — Breakfast + plan day.`,
        telemetry: {
          latency: '98ms',
          tokens: '110 tokens',
          confidence: '99.2%'
        }
      }
    },
    search: {
      default: {
        query: 'Latest AI news in Nepal?',
        citations: [
          { title: 'Nepal AI Ecosystem 2026', url: 'https://tech-nepal.org', time: '14m ago' },
          { title: 'KU AI Research Lab', url: 'https://ku.edu.np', time: '1h ago' },
          { title: 'SARA AI Launch', url: 'https://github.com', time: 'Just now' }
        ],
        response: `Nepal AI in 2026:\n\n• Local assistants like SARA AI.\n• Nepali NLP research at universities.\n• Growing startup hubs in Kathmandu + Pokhara.`,
        telemetry: {
          latency: '240ms',
          tokens: '245 tokens',
          confidence: '98.9%'
        }
      }
    }
  };

  const [activeScenarioKey, setActiveScenarioKey] = useState<string>('default');
  const activeContent: DemoContent =
    scenarios[selectedModeId]?.[activeScenarioKey] ||
    scenarios[selectedModeId]?.['default'] ||
    scenarios['thinker']['default'];

  // Mode Selection & Simulation Trigger
  const handleSelectMode = (modeId: 'fast' | 'thinker' | 'search') => {
    setSelectedModeId(modeId);
    setActiveScenarioKey('default');
    setIsSimulating(true);
    setActiveStepIndex(0);

    if (modeId === 'thinker') {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setActiveStepIndex(step);
        if (step >= 3) {
          clearInterval(interval);
          setIsSimulating(false);
        }
      }, 450);
    } else {
      setTimeout(() => {
        setIsSimulating(false);
      }, 350);
    }
  };

  // Copy Output Handler
  const handleCopy = async () => {
    try {
      const textToCopy = `${activeContent.response}${activeContent.codeSnippet ? `\n\n${activeContent.codeSnippet.code}` : ''}`;
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Text-To-Speech Handler
  const handleSpeak = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = activeContent.response.replace(/[*_#•]/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 1.05;
      utter.onend = () => setIsPlayingAudio(false);
      utter.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utter);
      setIsPlayingAudio(true);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3500);
    }
  };

  // Custom question submission
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsSimulating(true);
    setActiveStepIndex(0);
    const queryText = customPrompt.trim();
    setCustomPrompt('');

    // Check if query is about Aryan or Python or general
    const lower = queryText.toLowerCase();
    if (lower.includes('aryan')) {
      setActiveScenarioKey('aryan');
    } else {
      setActiveScenarioKey('default');
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const presetChips: Array<{ key: string; label: string }> = selectedModeId === 'thinker'
    ? [
        { key: 'default', label: 'Dijkstra vs A* Algorithm' },
        { key: 'aryan', label: 'Who is Aryan Hawari?' }
      ]
    : selectedModeId === 'fast'
      ? [
          { key: 'default', label: 'Mount Everest Summary' },
          { key: 'casual', label: 'High-Focus Schedule' }
        ]
      : [{ key: 'default', label: 'Nepal Tech & AI Ecosystem 2026' }];

  return (
    <section id="sara-modes" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="How SARA thinks"
          eyebrowIcon={<Brain className="w-3.5 h-3.5" />}
          title={
            <>
              Three modes, <span className="text-gradient">one assistant</span>
            </>
          }
          description="Switch between instant replies, deep step-by-step reasoning, and live answers from the web — all in the same chat."
        />

        {/* Three Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-12">
          {saraModes.map((mode) => {
            const isSelected = selectedModeId === mode.id;
            const Icon = modeIcon[mode.id];

            return (
              <motion.div
                key={mode.id}
                whileHover={{ y: -4 }}
                onMouseMove={handleSpotlight}
                onClick={() => handleSelectMode(mode.id)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl cursor-pointer spotlight-card ${
                  isSelected
                    ? 'bg-white/90 border-2 border-red-600 shadow-xl shadow-red-600/10'
                    : 'ultra-glass-card hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Badge and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-600/30 scale-105'
                        : 'bg-white/80 border border-neutral-200/80 text-neutral-700'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono px-3 py-1 rounded-full font-semibold bg-white/80 border border-neutral-200/70 text-neutral-600">
                      {mode.id === 'fast' ? '<150ms Latency' : mode.id === 'thinker' ? 'Deep Reasoning' : 'Real-time Web'}
                    </span>
                  </div>

                  {/* Mode Title and Tagline */}
                  <div className="space-y-1 mb-3">
                    <h3 className="font-heading font-bold text-2xl text-neutral-900 tracking-tight flex items-center gap-2">
                      <span>{mode.name}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      )}
                    </h3>
                    <p className="text-xs font-semibold text-red-600 font-mono">
                      "{mode.tagline}"
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {mode.description}
                  </p>

                  {/* Suitable For List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.14em] block font-mono">
                      Optimized for:
                    </span>
                    <ul className="space-y-1.5">
                      {mode.suitableFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                          <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select / Activate Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectMode(mode.id);
                  }}
                  id={`mode-btn-${mode.id}`}
                  className={`w-full py-3.5 rounded-full font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white btn-primary'
                      : 'bg-white/80 hover:bg-white text-neutral-800 border border-neutral-200/80'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSelected ? `Active: ${mode.name}` : `Switch to ${mode.name}`}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Live Cognitive Demonstration Console */}
        <motion.div
          layout
          className="rounded-[32px] ultra-glass p-6 sm:p-10 border border-white/80"
        >
          {/* Console Header with Live Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/70">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <div>
                <h4 className="font-heading font-bold text-lg text-neutral-900 flex items-center gap-2">
                  <span>Live demo</span>
                  <span className="text-red-600 font-mono text-sm uppercase tracking-wider">— {selectedModeId} mode</span>
                </h4>
                <p className="text-xs text-neutral-500">
                  Real answers, simulated locally in your browser
                </p>
              </div>
            </div>

            {/* Telemetry Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="px-3 py-1 rounded-full bg-white/80 border border-neutral-200/70 text-neutral-700 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-red-600" />
                <span>{activeContent.telemetry.latency}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/80 border border-neutral-200/70 text-neutral-700">
                <span>{activeContent.telemetry.tokens}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                <span>{activeContent.telemetry.confidence} on target</span>
              </div>
            </div>
          </div>

          {/* Quick Scenario Selector & Custom Question Form */}
          <div className="py-4 border-b border-neutral-200/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 font-semibold uppercase tracking-[0.12em]">Presets:</span>
              {presetChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => { setActiveScenarioKey(chip.key); setIsSimulating(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeScenarioKey === chip.key
                      ? 'text-white btn-primary'
                      : 'bg-white/80 hover:bg-white text-neutral-700 border border-neutral-200/80'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Custom Query Input */}
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 max-w-md w-full">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ask SARA in this mode..."
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-full bg-white/80 border border-neutral-200/80 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0 btn-primary"
              >
                <Send className="w-3 h-3" />
                <span>Simulate</span>
              </button>
            </form>
          </div>

          {/* Console Body: Prompt & Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">

            {/* Left Column: Simulated Prompt & Cognitive Pipeline Steps */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase text-neutral-400 tracking-[0.13em] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>Question</span>
                </span>
                <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 text-neutral-900 text-sm font-heading font-medium leading-relaxed">
                  "{activeContent.query}"
                </div>
              </div>

              {/* Step-by-Step Chain of Thought Progress for DEEP THINKER */}
              {selectedModeId === 'thinker' && activeContent.thoughtSteps && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-red-600 uppercase tracking-[0.13em] flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" />
                      <span>Reasoning steps</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">Step-by-step</span>
                  </div>

                  <div className="space-y-2 p-4 rounded-2xl bg-neutral-950 text-neutral-300 border border-neutral-800 shadow-md">
                    {activeContent.thoughtSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`text-xs flex items-start gap-2.5 transition-opacity duration-300 ${
                          isSimulating && idx > activeStepIndex ? 'opacity-30' : 'opacity-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="font-mono text-[11px] leading-relaxed text-neutral-300">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Sources if SEARCH mode */}
              {selectedModeId === 'search' && activeContent.citations && (
                <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-[0.13em] flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Sources from the live web</span>
                    </span>
                  <div className="space-y-2">
                    {activeContent.citations.map((cite, idx) => (
                      <a
                        key={idx}
                        href={cite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/80 hover:bg-white border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-800 hover:text-red-600 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium truncate max-w-[240px]">{cite.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                          <span>{cite.time}</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Formatted Output Stream */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.13em] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SARA&apos;s answer</span>
                  </span>

                {/* Action Buttons: Copy, Audio, Reaction */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-600 hover:text-red-600 transition-colors cursor-pointer"
                    title="Copy Formatted Text"
                  >
                    {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={handleSpeak}
                    className={`p-1.5 rounded-lg bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-600 hover:text-red-600 transition-colors cursor-pointer ${
                      isPlayingAudio ? 'text-red-600' : ''
                    }`}
                    title="Speech Synthesis Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setLikedState(likedState === 'like' ? null : 'like')}
                    className={`p-1.5 rounded-lg bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-600 hover:text-emerald-600 transition-colors cursor-pointer ${
                      likedState === 'like' ? 'text-emerald-600 bg-emerald-50' : ''
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setLikedState(likedState === 'dislike' ? null : 'dislike')}
                    className={`p-1.5 rounded-lg bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-600 hover:text-rose-600 transition-colors cursor-pointer ${
                      likedState === 'dislike' ? 'text-rose-600 bg-rose-50' : ''
                    }`}
                    title="Not Helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Formatted Natural Answer Container */}
              <div className="p-6 rounded-2xl bg-white/90 border border-neutral-200/70 shadow-sm space-y-4">
                {isSimulating ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-3 text-red-600">
                    <RefreshCw className="w-6 h-6 animate-spin text-red-600" />
                    <span className="text-xs font-semibold">
                      Thinking in {selectedModeId} mode…
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap font-normal">
                      {activeContent.response}
                    </div>

                    {/* Color-Coded Syntax Code Snippet */}
                    {activeContent.codeSnippet && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-md">
                        {/* Titlebar */}
                        <div className="px-3.5 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="ml-2 text-neutral-300 font-semibold">{activeContent.codeSnippet.filename}</span>
                          </div>
                          <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>

                        {/* Code Lines */}
                        <div className="p-3.5 font-mono text-[11px] sm:text-xs leading-5 overflow-x-auto select-text scrollbar-thin">
                          {activeContent.codeSnippet.lines.map((line) => (
                            <div key={line.num} className="flex hover:bg-white/[0.02]">
                              <span className="w-6 text-right pr-3 text-neutral-600 select-none">
                                {line.num}
                              </span>
                              <div className="flex-1 whitespace-pre">
                                {line.tokens.map((token, idx) => (
                                  <span key={idx} className={token.color}>
                                    {token.text}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Run tag */}
                        <div className="px-3.5 py-1.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-emerald-400" />
                            Python 3.12
                          </span>
                          <span className="text-emerald-400 font-semibold">Run this yourself</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
