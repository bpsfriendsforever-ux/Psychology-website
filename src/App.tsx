/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import AppointmentScheduler from './components/AppointmentScheduler';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Heart, Activity, Smile, KeyRound, Star, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = React.useState<string>('individual-therapy');

  const handleSelectServiceAndTab = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="mindful-path-app" className="min-h-screen bg-white text-slate-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* Dynamic top bar sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main interactive visual portal */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <div id="tab-home">
                <Hero onNavigate={handleCustomNavigate} />
                
                {/* Visual Bento highlight badges of practice elements */}
                <section id="highlights" className="bg-white py-16 border-t border-slate-200/80">
                  <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                      <p className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] text-blue-600">Clinical Priorities</p>
                      <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
                        Our Therapeutic Foundations
                      </h3>
                      <p className="font-sans text-xs text-slate-600">How we structure your path to emotional regulation and long-term autonomy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Badge 1 */}
                      <div className="rounded-sm border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:border-blue-200 hover:shadow-xs transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                          <Activity className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">Nervous System Centered</h4>
                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          We assess stress not merely as cognitive thoughts, but as physiological signals inside your nervous system. Our somatic exercises regulate stress organically before unpacking cognitive structures.
                        </p>
                      </div>

                      {/* Badge 2 */}
                      <div className="rounded-sm border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:border-blue-200 hover:shadow-xs transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                          <Smile className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">Tailor-Made Resilience</h4>
                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          No diagnostic labeling. Together, we co-create actionable worksheets, mindfulness grounding, and behavioral adjustments suited specifically for your daily professional and romantic realities.
                        </p>
                      </div>

                      {/* Badge 3 */}
                      <div className="rounded-sm border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:border-blue-200 hover:shadow-xs transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                          <KeyRound className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-sm font-bold text-slate-900">Radical Sovereignty & Trust</h4>
                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          You remain the author of your healing. We act of clinical mirros and scientific sounding boards, equipping you with permanent techniques to thrive autonomously after therapy finishes.
                        </p>
                      </div>

                    </div>

                    {/* Highly curated Testimonial block */}
                    <div className="mt-16 max-w-3xl mx-auto rounded-sm bg-blue-50/40 p-8 text-center relative border border-blue-100">
                      <div className="absolute top-4 left-4 text-blue-200 font-serif text-5xl">“</div>
                      <div className="space-y-4 relative z-10 font-serif">
                        <p className="text-sm text-blue-900 italic leading-relaxed">
                          "Working with Dr. Sinclair redesigned how I perceive stress. Instead of reacting frantically during professional slides, I now possess actual, physical somatic tools to ground myself. It changed both my business decisions and my quality of sleep. I cannot recommend Mindful Path enough."
                        </p>
                        <div className="font-sans">
                          <p className="text-xs font-bold text-slate-800">— Clinical Client, May 2026</p>
                          <p className="text-[10px] uppercase tracking-wider text-blue-600 mt-0.5">Somatic Individual Therapy Track</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                <AboutSection />
              </div>
            )}

            {activeTab === 'services' && (
              <div id="tab-services">
                <ServicesSection onSelectService={handleSelectServiceAndTab} />
              </div>
            )}

            {activeTab === 'booking' && (
              <div id="tab-booking">
                <AppointmentScheduler initialServiceId={selectedServiceId} />
              </div>
            )}

            {activeTab === 'blog' && (
              <div id="tab-blog">
                <BlogSection />
              </div>
            )}

            {activeTab === 'contact' && (
              <div id="tab-contact">
                <ContactSection />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global licensing and guidelines bottom Footer */}
      <Footer onNavigate={handleCustomNavigate} />

    </div>
  );
}
