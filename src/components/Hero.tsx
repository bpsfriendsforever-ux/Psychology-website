import { motion } from 'motion/react';
import { Sparkles, CalendarCheck, Shield, ChevronRight, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onNavigate: (tabId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          
          {/* Hero text block */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-sm bg-blue-50 px-3 py-1 border border-blue-100 font-sans text-xs font-semibold uppercase tracking-wider text-blue-700"
            >
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span>Welcoming New Clinical Clients for 2026</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-tight"
              >
                Restoring Balance.<br />
                Cultivating <span className="text-blue-600 italic">Resilience</span>.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed"
              >
                Welcome to a confidential, compassionate space where evidence-based psychotherapy meets mindful somatic regulation. Together, we’ll navigate life’s complex transitions, alleviate distress, and rebuild lasting mental harmony.
              </motion.p>
            </div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-book-btn"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-blue-600 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 font-bold"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>Schedule Intake Session</span>
              </button>
              
              <button
                id="hero-services-btn"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-1 rounded-sm border border-slate-200 bg-white px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-blue-600 transition-all hover:bg-blue-50/50 hover:text-blue-700"
              >
                <span>Explore Specialties</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Value Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="font-sans text-xs font-bold tracking-tight text-slate-800">100% Confidential</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-blue-500 font-medium font-bold">HIPAA Compliant Care</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                  <HeartHandshake className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="font-sans text-xs font-bold tracking-tight text-slate-800">Evidence-Based</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-blue-500 font-medium font-bold">CBT, ACT, Somatic SE</p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="font-sans text-xs font-bold tracking-tight text-slate-800">Hybrid Care</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-blue-500 font-medium font-bold">Online + In-Person</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Illustration / Graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              <div className="relative overflow-hidden rounded-sm border border-slate-200 bg-slate-50 p-2 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1544027751-4a142850b119?auto=format&fit=crop&q=80&w=600&h=700"
                  alt="Counseling and reflection space"
                  className="h-full w-full object-cover rounded-sm grayscale contrast-[95%]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Quote overlay card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-white/25 bg-blue-950/95 p-4 text-white backdrop-blur-md shadow-lg">
                  <p className="font-serif text-xs italic text-blue-100">
                    "The curious paradox is that when I accept myself just as I am, then I can change."
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-blue-400 mt-2 font-bold select-none">
                    — Carl Rogers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
