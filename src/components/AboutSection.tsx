import { motion } from 'motion/react';
import { PRACTITIONERS } from '../data';
import { GraduationCap, Award, Compass, HeartPulse, UserCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Our Care Providers
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            Meet Our Clinical Team
          </h2>
          <div className="h-0.5 w-12 bg-blue-600 mx-auto"></div>
          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
            Professional clinicians dedicated to supporting your unique emotional framework with science, clinical experience, and deep warmth.
          </p>
        </div>

        {/* Practitioners Profiles */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {PRACTITIONERS.map((doc, idx) => (
            <motion.div
              id={`provider-profile-${idx}`}
              key={doc.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-sm bg-white border border-slate-200 shadow-sm transition-all hover:border-blue-200 hover:shadow-xs"
            >
              {/* Doctor Headshot */}
              <div className="w-full md:w-2/5 aspect-[4/5] overflow-hidden rounded-sm bg-slate-50 flex-shrink-0">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-full w-full object-cover grayscale transition-all hover:scale-105 duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-grow space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                    {doc.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-blue-700 mt-0.5">
                    {doc.role}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doc.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-1.5">
                  <p className="font-sans text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-blue-500" /> Major Specialties
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-sm bg-blue-50 px-2.5 py-0.5 font-sans text-[10px] sm:text-xs font-medium text-blue-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education / Credentials */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="font-sans text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-500" /> Credentials & Education
                  </p>
                  <ul className="space-y-1">
                    {doc.education.map((edu, i) => (
                      <li key={i} className="font-sans text-slate-600 font-medium text-[10px] sm:text-xs flex items-start gap-1">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clinical Practice Philosophy */}
        <motion.div
          id="practice-philosophy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-sm bg-blue-950 p-8 md:p-12 text-white border border-blue-900 shadow-md"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300 font-bold flex items-center gap-1">
                <HeartPulse className="h-3.5 w-3.5" /> Our North Star
              </span>
              <h3 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl leading-snug">
                A Collaborative Approach to Healing
              </h3>
            </div>
            
            <div className="lg:col-span-8 space-y-6 text-blue-100 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                We do not believe in clinical shortcuts or rigid diagnostic labeling. At Mindful Path, we treat you as an active collaborator in your own growth. Our work integrates the deep awareness of somatic nervous-system regulation with cognitive restructure patterns, addressing both the physical body and the cognitive mind.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-blue-900 pt-6">
                <div className="flex gap-2.5 items-start">
                  <div className="rounded-sm bg-blue-900/40 p-1.5 text-blue-300 flex-shrink-0">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Client Autonomy First</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-blue-200 mt-0.5">We guide and mirror; you retain complete sovereignty over your healing schedule.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="rounded-sm bg-blue-900/40 p-1.5 text-blue-300 flex-shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Pragmatic Scientific Integrity</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-blue-200 mt-0.5">Every coping tool and sensory practice is grounded strictly in contemporary neurobiology.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
