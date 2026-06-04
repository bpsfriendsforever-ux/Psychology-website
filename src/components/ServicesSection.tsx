import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { Service } from '../types';
import { User, Users, Brain, Compass, Clock, Check, ArrowRight, ShieldAlert, Sparkles, X } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'Brain': return <Brain className="h-5 w-5" />;
      case 'Compass': return <Compass className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <section id="services-section" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Available Support Models
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Specialized Mental Health Services
            </h2>
            <div className="h-0.5 w-12 bg-blue-600"></div>
          </div>
          <p className="font-sans text-slate-600 text-sm leading-relaxed max-w-md">
            Interactive frameworks tailored around your psychological baseline, combining cognitive restructure and physiological regulation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              id={`service-card-${service.id}`}
              key={service.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-sm bg-white border border-slate-205/90 p-6 shadow-sm hover:border-blue-200 hover:shadow-xs transition-all group"
            >
              <div className="space-y-4">
                {/* Icon Square */}
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  {getIconComponent(service.icon)}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-serif text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-500 font-medium">
                    {service.duration} • <span className="text-slate-800 font-semibold">{service.price}</span> per consultation
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Buttons */}
              <div className="mt-6 flex items-center justify-between gap-2 pt-4 border-t border-slate-50">
                <button
                  id={`learn-more-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="font-sans text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  Detail Info
                </button>
                <button
                  id={`quick-book-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="rounded-sm bg-blue-50 font-sans text-[10px] uppercase tracking-wider font-bold text-blue-600 px-3 py-1.5 transition-all hover:bg-blue-600 hover:text-white flex items-center gap-1 active:scale-95"
                >
                  Book <span><ArrowRight className="h-3 w-3" /></span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informative Help Box */}
        <div className="mt-16 rounded-sm border border-slate-200 bg-slate-50 p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-3 items-start md:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-amber-50 text-amber-700 border border-amber-200/50 flex-shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-semibold text-slate-900">Need Immediate Crisis Support?</h4>
              <p className="font-sans text-[11px] sm:text-xs text-slate-600 mt-0.5">Physical or severe mental safety is paramount. If you are experiencing emergency threats, please Dial 988 (National Suicide & Crisis Lifeline) available 24/7.</p>
            </div>
          </div>
          <a
            href="tel:988"
            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-mono text-xs font-bold uppercase border border-slate-200 rounded-sm text-slate-800 bg-white hover:bg-slate-50 transition-colors"
          >
            Call 988 Hotlines
          </a>
        </div>

        {/* Light Modal detailing selected specialty */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-2xl bg-white rounded-sm shadow-xl overflow-hidden border border-slate-200"
              >
                {/* Header graphic */}
                <div className="bg-blue-950 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-900/40 text-blue-300">
                      {getIconComponent(selectedService.icon)}
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold leading-tight">{selectedService.title}</h3>
                      <p className="font-mono text-[9px] text-blue-300 uppercase tracking-widest font-semibold mt-0.5">
                        {selectedService.duration} • {selectedService.price} per session
                      </p>
                    </div>
                  </div>
                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedService(null)}
                    className="p-1 rounded-sm hover:bg-blue-900 text-slate-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  <p className="font-sans text-slate-600 text-sm leading-relaxed">
                    {selectedService.longDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 font-sans">
                    {/* Benefits Column */}
                    <div className="space-y-3">
                      <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-sm">
                        <Sparkles className="h-3 w-3 text-blue-500" /> Key Benefits & Focus
                      </h4>
                      <ul className="space-y-2">
                        {selectedService.benefits.map((ben) => (
                          <li key={ben} className="font-sans text-[11px] sm:text-xs text-slate-600 flex items-start gap-2">
                            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-blue-50 text-blue-600 flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Techniques Column */}
                    <div className="space-y-3">
                      <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-sm">
                        <Brain className="h-3.5 w-3.5 text-blue-500" /> Modalities & Methods
                      </h4>
                      <ul className="space-y-2">
                        {selectedService.techniques.map((tech) => (
                          <li key={tech} className="font-sans text-[11px] sm:text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-blue-600 font-extrabold mt-0.5">•</span>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/80 flex justify-end gap-3">
                  <button
                    id="modal-cancel-btn"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 rounded-sm font-sans text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Close info
                  </button>
                  <button
                    id="modal-book-btn"
                    onClick={() => {
                      onSelectService(selectedService.id);
                      setSelectedService(null);
                    }}
                    className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all shadow-sm"
                  >
                    Select Specialty & Book
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
