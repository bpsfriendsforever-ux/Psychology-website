import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FREQUENT_QUESTIONS, BUSINESS_HOURS } from '../data';
import { MapPin, Phone, Mail, Clock, HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

export default function ContactSection() {
  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Form state
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('General Consultation Options');
  const [message, setMessage] = React.useState('');
  
  const [isSubmitSuccess, setIsSubmitSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Please provide your name';
    if (!email.trim()) {
      tempErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email format';
    }
    if (!message.trim()) tempErrors.message = 'Please enter your message text';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save mock contact submission safely
    const submissionId = 'msg_' + Date.now().toString(36);
    const submissions = JSON.parse(localStorage.getItem('mindful_path_messages') || '[]');
    submissions.push({ id: submissionId, name, email, subject, message, submittedAt: new Date().toISOString() });
    localStorage.setItem('mindful_path_messages', JSON.stringify(submissions));

    setIsSubmitSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    
    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 4500);
  };

  return (
    <section id="contact-section" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 font-sans">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            Office Contacts & FAQs
          </h2>
          <div className="h-0.5 w-12 bg-blue-600 mx-auto"></div>
          <p className="font-sans text-slate-600 text-sm leading-relaxed">
            Find details on clinical hours, insurance procedures, or contact us interactively with clinical queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Expandable FAQs Accordion */}
          <div id="faq-column" className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-5.5 w-5.5 text-blue-600" /> Frequently Asked Questions
              </h3>
              <p className="font-sans text-xs text-slate-500">Essential details regarding scheduling models, session bills, and therapy expectations.</p>
            </div>

            <div className="space-y-3 pt-2">
              {FREQUENT_QUESTIONS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    idx-val={idx}
                    key={idx}
                    className="border border-slate-200 bg-white rounded-sm overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      id={`faq-btn-${idx}`}
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 font-sans text-sm font-bold text-left text-slate-900 hover:bg-slate-50/50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div id={`faq-ans-${idx}`} className="px-4 pb-4 pt-1 font-sans text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interaction Form & Coordinates */}
          <div id="form-column" className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Mail className="h-4.5 w-4.5 text-blue-600" /> Send Confidential Message
                </h4>
                <p className="font-sans text-xs text-slate-500 leading-tight">We respond to clinical questions within 24 operational hours.</p>
              </div>

              {isSubmitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-sm bg-blue-50/80 border border-blue-100 p-5 text-center space-y-3"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-blue-100 text-blue-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-blue-700 font-bold">Confidential Inquiry Queued!</h5>
                    <p className="font-sans text-[11px] text-blue-700 leading-relaxed mt-1">
                      Thank you for inbounding. Your inquiry remains encrypted, and a clinician will reach out to you directly shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="font-sans text-[11px] font-bold text-slate-900">Full Name</label>
                      <input
                        id="contact-sender-name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-450 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors.name && <p className="font-sans text-[10px] text-red-650 font-bold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-sans text-[11px] font-bold text-slate-900">Secure Email</label>
                      <input
                        id="contact-sender-email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-450 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors.email && <p className="font-sans text-[10px] text-red-650 font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Topic dropdown */}
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] font-bold text-slate-900">Discussion Topic</label>
                    <select
                      id="contact-discus-topic"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="General Consultation Options">General Consultation Options</option>
                      <option value="Billing & Out-of-Network Superbills">Billing & Out-of-Network Superbills</option>
                      <option value="Clinical Adolescent Care Requirements">Clinical Adolescent Care Requirements</option>
                      <option value="Somatic and Mindfulness Workshops">Somatic and Mindfulness Workshops</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] font-bold text-slate-900">Confidential Inquiry Details</label>
                    <textarea
                      id="contact-inquiry-notes"
                      rows={4}
                      placeholder="Type your secure medical query here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-450 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.message && <p className="font-sans text-[10px] text-red-650 font-bold">{errors.message}</p>}
                  </div>

                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-150 rounded-sm">
                    <ShieldCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-sans text-[9px] text-slate-550 leading-snug">HIPAA Protected: Encryption is actively enabled on your submission package.</span>
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-sans text-xs font-bold uppercase tracking-widest transition-all shadow-sm font-bold"
                  >
                    <Send className="h-3.5 w-3.5" /> Send Encrypted inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Clinic Operational details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 space-y-4">
              <h5 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-blue-600 border-b border-slate-200 pb-1.5">MIND_PATH_COORDINATES</h5>
              
              <ul className="space-y-3 font-sans text-xs text-slate-650">
                <li id="contact-addr" className="flex items-start gap-2">
                  <MapPin className="h-4.5 w-4.5 text-blue-500 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Mindful Path Practice Office:</span>
                    <p className="font-medium text-slate-600 mt-0.5 leading-relaxed">450 Wellness Boulevard, Suite 120, San Francisco, CA 94102</p>
                  </div>
                </li>

                <li id="contact-phone" className="flex items-start gap-2">
                  <Phone className="h-4.5 w-4.5 text-blue-500 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Support Tel Line:</span>
                    <p className="font-medium text-slate-600 mt-0.5">(555) 019-9430</p>
                  </div>
                </li>

                <li id="contact-oper" className="flex items-start gap-2">
                  <Clock className="h-4.5 w-4.5 text-blue-500 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Clinician Operational Hours:</span>
                    <div className="space-y-1 mt-1 font-mono text-[10px] text-blue-600">
                      {BUSINESS_HOURS.map((hr, index) => (
                        <div key={index} className="flex justify-between gap-4">
                          <span className="font-bold">{hr.days}:</span>
                          <span>{hr.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
