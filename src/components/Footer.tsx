import { Brain, Heart, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="site-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Upper footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand block */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-600 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <span className="font-serif text-base font-bold text-white tracking-tight">Mindful Path Psychology</span>
          </div>
          <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-xs">
            Licensed outpatient clinical psychotherapy blending classic evidence-based standards with somatic mindfulness regulation. San Francisco, CA.
          </p>
          <div className="flex gap-2 items-center font-mono text-[9px] uppercase tracking-widest text-slate-400">
            <Lock className="h-3 w-3 text-blue-450" /> SECURED SECURE CONNECTION
          </div>
        </div>

        {/* Quick Navigate Block */}
        <div className="md:col-span-3 space-y-3 font-sans">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Outpatient Navigation</p>
          <ul className="space-y-2 font-sans text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-slate-300">
                Clinic Welcome
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors text-slate-300">
                Specialized Services
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('booking')} className="hover:text-blue-400 transition-colors text-slate-300">
                Schedule Appointment Intake
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="hover:text-blue-400 transition-colors text-slate-300">
                Self-Reflection Blog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors text-slate-300">
                Contact Details & FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Legal credentials block */}
        <div className="md:col-span-5 space-y-4 font-sans">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Clinical Standards & Credentials</p>
          <p className="font-sans text-xs text-slate-300 leading-relaxed">
            All services are provided by licensed mental health practitioners under California Licensing Board guidelines. Practitioner licensure credentials: No. 4088921 (Psy.D.) and Gottman Track Certified level 3 clinical affiliates.
          </p>
          
          {/* Urgent Emergency Warning Badge */}
          <div className="rounded-sm border border-red-900/60 bg-red-950/40 p-3 flex gap-2 items-start">
            <Shield className="h-4.5 w-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-[10px] text-red-300 leading-relaxed">
              <strong>Emergency Crisis Notification:</strong> Outpatient services cannot provide medical critical rescue. If you perceive direct danger of physical injury, please immediately Dial 911 or call 988 for crisis hotlines.
            </p>
          </div>
        </div>

      </div>

      {/* Lower footer copyright */}
      <div className="border-t border-slate-800 py-6 text-center font-sans text-[11px] text-slate-400">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:px-8">
          <p>© 2026 Mindful Path Clinical Psychology Practice. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-blue-400 fill-blue-400" /> for psychological agency and resilience & Health Client Standards
          </p>
        </div>
      </div>

    </footer>
  );
}
