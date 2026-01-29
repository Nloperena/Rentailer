import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hash, ChevronDown, ChevronRight, Plus, Settings,
  Users, Crown, Shield, Circle, Send, Smile, Image, Gift,
  AtSign, Pin, Bell, BellOff, Search, MoreHorizontal,
  Inbox, ArrowRight, Flame, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  unread?: number;
  isLocked?: boolean;
}

interface ChannelCategory {
  id: string;
  name: string;
  channels: Channel[];
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  role: 'admin' | 'moderator' | 'pro' | 'member';
  activity?: string;
}

interface Message {
  id: string;
  author: Member;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

// Mock data
const operationalStreams: ChannelCategory[] = [
  {
    id: 'intel',
    name: 'Strategic Intel',
    channels: [
      { id: 'announcements', name: 'Global Broadcasts', type: 'announcement', unread: 2 },
      { id: 'rules', name: 'Operational Standards', type: 'text', isLocked: true },
    ],
  },
  {
    id: 'ops',
    name: 'Live Operations',
    channels: [
      { id: 'general', name: 'Command Center', type: 'text', unread: 5 },
      { id: 'str-talk', name: 'STR Intelligence', type: 'text', unread: 3 },
      { id: 'marketing', name: 'Market Reach', type: 'text' },
    ],
  },
];

const members: Member[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', status: 'online', role: 'admin', activity: 'Refining Academy Standards' },
  { id: '2', name: 'James Mitchell', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', status: 'online', role: 'moderator' },
  { id: '3', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', status: 'idle', role: 'pro', activity: 'Analyzing Miami Yields' },
  { id: '4', name: 'Michael Park', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', status: 'online', role: 'pro' },
  { id: '7', name: 'Nicholas Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', status: 'online', role: 'member' },
];

const mockMessages: Message[] = [
  {
    id: '1',
    author: members[0],
    content: "Intelligence Update: We've just deployed the new Hospitality ROI module. All Council members should review the pricing benchmarks.",
    timestamp: '10:32 AM',
    reactions: [{ emoji: '🔥', count: 5 }, { emoji: '📈', count: 3 }],
  },
  {
    id: '2',
    author: members[3],
    content: "Outstanding. I've been tracking these benchmarks in my Miami portfolio and the shift is significant.",
    timestamp: '10:45 AM',
  },
  {
    id: '3',
    author: members[2],
    content: "Has anyone transitioned their dynamic pricing logic to the JAiNE v2 engine yet? Looking for deployment feedback.",
    timestamp: '11:02 AM',
    reactions: [{ emoji: '🤔', count: 2 }],
  },
];

const statusColors = {
  online: 'bg-emerald-500',
  idle: 'bg-amber-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

const roleColors = {
  admin: 'text-gold font-bold',
  moderator: 'text-gold-light font-bold',
  pro: 'text-gold',
  member: 'text-muted-foreground',
};

// Simplified Sidebar
function StreamSidebar({ 
  activeStream, 
  onSelectStream 
}: { 
  activeStream: string; 
  onSelectStream: (id: string) => void;
}) {
  return (
    <div className="w-72 bg-card/30 flex flex-col h-full border-r border-border/40 backdrop-blur-sm">
      <div className="h-20 px-6 flex items-center justify-between border-b border-border/40">
        <div className="flex flex-col">
          <span className="font-bold text-foreground text-sm tracking-tight leading-none uppercase">The Guild</span>
          <span className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-widest opacity-60">Intelligence Hub</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
          <Shield className="w-4 h-4 text-gold" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {operationalStreams.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50">
              {category.name}
            </h3>
            <div className="space-y-1">
              {category.channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onSelectStream(channel.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl w-full group transition-all relative",
                    activeStream === channel.id 
                      ? "bg-gold/10 text-foreground border border-gold/20" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                  )}
                >
                  <Hash className={cn(
                    "w-4 h-4 transition-colors",
                    activeStream === channel.id ? "text-gold" : "group-hover:text-gold-light"
                  )} />
                  <span className="flex-1 text-left text-sm font-bold tracking-tight">{channel.name}</span>
                  {channel.unread && (
                    <span className="px-1.5 py-0.5 rounded-full bg-gold text-primary-foreground text-[9px] font-black">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Integrated Member Stats */}
        <div className="pt-4 border-t border-border/40">
          <h3 className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50 mb-4">
            Active Strategists
          </h3>
          <div className="space-y-2 px-1">
            {members.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl bg-background/40 border border-border/20 group hover:border-gold/30 transition-all">
                <div className="relative">
                  <img src={member.avatar} className="w-8 h-8 rounded-lg object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                  <div className={cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background", statusColors[member.status])} />
                </div>
                <div className="min-w-0">
                  <p className={cn("text-xs font-bold truncate tracking-tight", roleColors[member.role])}>{member.name}</p>
                  <p className="text-[9px] text-muted-foreground truncate font-medium uppercase tracking-widest opacity-60">Level {Math.floor(Math.random() * 10) + 1} Strategist</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-[9px] font-black text-gold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
              View All 1.2k Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Content Area
function StreamFeed({ streamName }: { streamName: string }) {
  const [message, setMessage] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-background h-full relative">
      {/* Stream Header */}
      <div className="h-20 px-10 flex items-center justify-between border-b border-border/40 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-lg">
            <Hash className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground tracking-tight uppercase">{streamName}</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Live Stream</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-60 mt-0.5">Strategic deployment & feedback</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 bg-muted/20 rounded-2xl border border-border/40 px-4 py-2 focus-within:border-gold/40 transition-all">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Intelligence..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none w-48 font-medium"
            />
          </div>
          <button className="p-3 rounded-xl text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        {mockMessages.map((msg) => (
          <div key={msg.id} className="flex gap-6 group relative">
            <div className="relative flex-shrink-0">
              <img
                src={msg.author.avatar}
                alt={msg.author.name}
                className="w-12 h-12 rounded-2xl object-cover ring-1 ring-border group-hover:ring-gold/50 transition-all shadow-xl"
              />
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                statusColors[msg.author.status]
              )} />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-3">
                <span className={cn("font-bold text-sm tracking-tight", roleColors[msg.author.role])}>
                  {msg.author.name}<span className="tm">™</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-40">{msg.timestamp}</span>
              </div>
              <div className="surface-panel p-5 bg-card/50 border-border/40 rounded-2xl text-foreground text-sm leading-relaxed font-medium shadow-sm group-hover:border-gold/20 transition-all">
                {msg.content}
              </div>
              {msg.reactions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.reactions.map((reaction, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border/60 hover:border-gold/40 hover:bg-gold/5 transition-all group/emoji"
                    >
                      <span className="text-base">{reaction.emoji}</span>
                      <span className="text-xs font-black text-muted-foreground group-hover/emoji:text-gold">{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-10 pt-2">
        <div className="bg-card rounded-[2rem] border border-border/60 p-3 focus-within:border-gold/50 transition-all shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-focus-within:bg-gold/10 transition-colors" />
          
          <div className="flex items-center gap-3 relative z-10">
            <button className="p-3 rounded-2xl text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all">
              <Plus className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Contribute to the ${streamName} intelligence...`}
              className="flex-1 bg-transparent text-foreground font-medium placeholder:text-muted-foreground/40 outline-none text-base px-2"
            />
            <button className="btn-gold h-12 px-8 rounded-2xl text-primary-foreground flex items-center gap-3 transition-all shadow-xl shadow-gold/10">
              <Send className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Initiate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Guild Hub Component
export function DiscordCommunity() {
  const [activeStream, setActiveStream] = useState('general');
  
  const currentStream = operationalStreams
    .flatMap(c => categoryToStream(c))
    .find(s => s.id === activeStream);

  function categoryToStream(cat: ChannelCategory) {
    return cat.channels;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-background rounded-[2.5rem] border border-border/60 overflow-hidden shadow-2xl relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <StreamSidebar 
        activeStream={activeStream} 
        onSelectStream={setActiveStream} 
      />
      
      <StreamFeed streamName={currentStream?.name || 'General'} />
    </div>
  );
}

export default DiscordCommunity;
