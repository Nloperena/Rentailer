import React from 'react';
import { BookOpen, Play, CheckCircle2, Clock, Star, ArrowRight } from 'lucide-react';
import { SpringButton } from '../motion/SpringButton';
import { FadeIn, StaggerContainer } from '../motion/MotionWrapper';
import { routes } from '@/lib/routes';

interface Course {
  title: string;
  description: string;
  level: string;
  duration: string;
  xp: number;
  complete?: boolean;
  implementationTrigger?: {
    label: string;
    href: string;
  };
}

export function LearningFeed({ courses }: { courses: Course[] }) {
  return (
    <StaggerContainer className="space-y-10">
      <FadeIn className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
          <h1 className="heading-section text-foreground leading-tight">Academy Curriculum</h1>
        </div>
        <p className="text-muted-foreground font-medium leading-relaxed italic opacity-80 max-w-md border-l border-border/40 pl-4">"Hospitality is not a service, it is a strategic advantage."</p>
      </FadeIn>

      <div className="grid gap-6">
        {courses.map((course, i) => (
          <FadeIn key={i} className="surface-panel p-0 overflow-hidden flex flex-col sm:flex-row group transition-all duration-500 hover:border-gold/40 shadow-xl bg-card">
            <div className="sm:w-56 bg-background flex items-center justify-center relative overflow-hidden shadow-inner border-r border-border/40">
              <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
              <BookOpen className="text-muted-foreground/20 transition-all duration-700 group-hover:scale-110 group-hover:text-gold/20" size={80} />
              {course.complete && (
                <div className="absolute inset-0 bg-gold/5 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-2xl shadow-gold/40">
                    <CheckCircle2 className="text-primary-foreground" size={32} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-10 flex-1 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-colors pointer-events-none" />
              
              <div className="flex justify-between items-start gap-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] bg-gold/10 text-gold px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] border border-gold/20">{course.level}</span>
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full border border-border/40">
                      <Clock size={12} className="text-gold/60" /> {course.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-gold transition-colors">{course.title}<span className="tm">™</span></h3>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gold fill-gold/20" />
                    <span className="text-gold font-bold text-2xl tracking-tighter">+{course.xp}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Authority XP</p>
                </div>
              </div>

              <p className="text-muted-foreground font-medium leading-relaxed max-w-xl text-sm opacity-90">{course.description}</p>

              <div className="flex items-center justify-between pt-8 border-t border-border/40 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(n => (
                      <img key={n} src={`https://i.pravatar.cc/100?u=${n+20}`} className="w-9 h-9 rounded-xl border-2 border-background shadow-2xl ring-1 ring-white/5" />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest self-center opacity-60">1.2k+ Strategists Enrolled</span>
                </div>
                
                <div className="flex gap-4">
                  {course.implementationTrigger && (
                    <a href={course.implementationTrigger.href}>
                      <SpringButton variant="outline" className="h-12 text-[10px] uppercase tracking-[0.2em] font-black px-6 rounded-xl border-border/60">
                        {course.implementationTrigger.label}
                      </SpringButton>
                    </a>
                  )}
                  <SpringButton className="h-12 text-[10px] uppercase tracking-[0.2em] font-black px-8 rounded-xl btn-gold text-primary-foreground shadow-lg shadow-gold/20">
                    {course.complete ? 'Review Module' : 'Initiate Training'}
                  </SpringButton>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </StaggerContainer>
  );
}
