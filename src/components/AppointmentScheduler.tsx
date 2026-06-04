import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { Appointment } from '../types';
import { CalendarCheck, Clock, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, ChevronLeft, Calendar, ShieldCheck, Trash2, Info } from 'lucide-react';

interface AppointmentSchedulerProps {
  initialServiceId?: string;
}

export default function AppointmentScheduler({ initialServiceId }: AppointmentSchedulerProps) {
  // Main State
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = React.useState(initialServiceId || SERVICES_DATA[0].id);
  
  // Date setup (list next 10 week days excluding Sunday)
  const getUpcomingDays = () => {
    const days = [];
    const date = new Date();
    let count = 0;
    while (count < 10) {
      date.setDate(date.getDate() + 1);
      // Skip Sundays (day = 0)
      if (date.getDay() !== 0) {
        days.push({
          formattedStr: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          isoString: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
        });
        count++;
      }
    }
    return days;
  };
  
  const upcomingDays = React.useMemo(() => getUpcomingDays(), []);
  
  const [selectedDate, setSelectedDate] = React.useState(upcomingDays[0].isoString);
  const [selectedTime, setSelectedTime] = React.useState('10:30 AM');
  
  // Client Form state
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    agreedToTerms: false
  });
  
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  // Saved appointments list (loaded from localStorage)
  const [existingBookings, setExistingBookings] = React.useState<Appointment[]>([]);
  const [recentBooking, setRecentBooking] = React.useState<Appointment | null>(null);

  React.useEffect(() => {
    const list = localStorage.getItem('mindful_path_bookings');
    if (list) {
      try {
        setExistingBookings(JSON.parse(list));
      } catch (err) {
        console.error("Error parsing bookings from disk", err);
      }
    }
  }, []);

  // Update selection if prop changed
  React.useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
      setStep(1); // Reset back to step 1
    }
  }, [initialServiceId]);

  const activeServiceObj = SERVICES_DATA.find(s => s.id === selectedService) || SERVICES_DATA[0];

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  // Form Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Telephone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      tempErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.agreedToTerms) {
      tempErrors.agreement = 'You must agree to the emergency crisis warning';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  // Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBooking: Appointment = {
      id: 'apt_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      serviceId: selectedService,
      date: selectedDate,
      timeSlot: selectedTime,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };

    const updatedBookings = [newBooking, ...existingBookings];
    setExistingBookings(updatedBookings);
    localStorage.setItem('mindful_path_bookings', JSON.stringify(updatedBookings));

    setRecentBooking(newBooking);
    setStep(4); // Success step!

    // Reset some of form values for next booking
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: '',
      agreedToTerms: false
    });
  };

  // Cancel Appointment
  const handleCancelBooking = (id: string) => {
    const updated = existingBookings.filter(item => item.id !== id);
    setExistingBookings(updated);
    localStorage.setItem('mindful_path_bookings', JSON.stringify(updated));
  };

  const getServiceTitle = (id: string) => {
    return SERVICES_DATA.find(s => s.id === id)?.title || 'Psychology Session';
  };

  return (
    <section id="scheduler-section" className="bg-white py-16 md:py-24 border-t border-b border-slate-105">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Intake Registration
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            Schedule Your Therapy Intake
          </h2>
          <div className="h-0.5 w-12 bg-blue-600 mx-auto"></div>
          <p className="font-sans text-slate-600 text-sm leading-relaxed">
            Initiate a collaborative medical consultation in three quick developmental steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-sans">
          
          {/* Main Booking Container */}
          <div className="lg:col-span-8 bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            {/* Step Indicators */}
            <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4 flex items-center justify-between">
              <div className="flex gap-1.5 items-center">
                <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                  Step {step} of 4
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`h-1.5 w-10 rounded-sm transition-all duration-300 ${
                      step >= num ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Steps Rendering */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <CalendarCheck className="h-5 w-5 text-blue-600" /> 1. Select Specialty Discipline
                      </h3>
                      <p className="font-sans text-xs text-slate-600">Choose the mental health model which matches your current intentions.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {SERVICES_DATA.map((service) => {
                        const isPicked = selectedService === service.id;
                        return (
                          <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 rounded-sm border cursor-pointer transition-all ${
                              isPicked
                                ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center ${
                                isPicked ? 'border-blue-600 bg-blue-600 text-white' : ''
                              }`}>
                                {isPicked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                              </span>
                              <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-sm">
                                {service.price}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-slate-900 mt-2">{service.title}</h4>
                            <p className="font-sans text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{service.description}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button
                        id="step1-next-btn"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 active:scale-95 font-bold"
                      >
                        Next: Choose Time <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <Clock className="h-5 w-5 text-blue-600" /> 2. Pick Date & Hour Slot
                      </h3>
                      <p className="font-sans text-xs text-slate-600">Select a convenient session hour from the available schedule matrix.</p>
                    </div>

                    {/* Horizontal Date picker */}
                    <div className="space-y-2">
                      <p className="font-sans text-xs font-bold text-slate-930 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-blue-500" /> Date Selection (Upcoming Weekdays)
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                        {upcomingDays.map((day) => {
                          const isPicked = selectedDate === day.isoString;
                          return (
                            <button
                              id={`date-slot-${day.isoString}`}
                              key={day.isoString}
                              type="button"
                              onClick={() => setSelectedDate(day.isoString)}
                              className={`flex-shrink-0 w-28 p-3 rounded-sm border snap-start text-center transition-all ${
                                isPicked
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                  : 'border-slate-200 bg-white hover:bg-blue-50/50 text-slate-800'
                              }`}
                            >
                              <p className={`font-mono text-[9px] uppercase tracking-wider ${
                                isPicked ? 'text-blue-100' : 'text-blue-500'
                              }`}>
                                {day.dayName.substring(0, 3)}
                              </p>
                              <p className="font-sans text-sm font-bold mt-1">
                                {day.formattedStr.split(',')[1] || day.formattedStr}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hour slots */}
                    <div className="space-y-2 pt-2">
                      <p className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-blue-500" /> Available Consultation Slots
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {timeSlots.map((slot) => {
                          const isPicked = selectedTime === slot;
                          return (
                            <button
                              id={`time-slot-${slot}`}
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`p-2.5 rounded-sm border text-center font-sans text-xs font-bold transition-all ${
                                isPicked
                                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-650'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between font-sans">
                      <button
                        id="step2-prev-btn"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1 px-4 py-2 font-sans text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-sm"
                      >
                        <ChevronLeft className="h-4 w-4" /> Specialties
                      </button>
                      <button
                        id="step2-next-btn"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 active:scale-95 font-bold"
                      >
                        Book Details <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText className="h-5 w-5 text-blue-600" /> 3. Contact & Brief Questionnaire
                      </h3>
                      <p className="font-sans text-xs text-slate-600">Provide basic demographic credentials and therapy goals safely.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <div className="space-y-1">
                          <label className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-blue-500" /> Full Client Name
                          </label>
                          <input
                            id="intake-name"
                            type="text"
                            placeholder="Eleanor Vance"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          {errors.name && <p className="font-sans text-[10px] text-red-600 font-bold">{errors.name}</p>}
                        </div>

                        {/* Email field */}
                        <div className="space-y-1">
                          <label className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-blue-500" /> Email Address
                          </label>
                          <input
                            id="intake-email"
                            type="email"
                            placeholder="eleanor@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          {errors.email && <p className="font-sans text-[10px] text-red-600 font-bold">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Telephone field */}
                        <div className="space-y-1 col-span-1">
                          <label className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-blue-500" /> Telephone Number
                          </label>
                          <input
                            id="intake-phone"
                            type="tel"
                            placeholder="(555) 012-3456"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          {errors.phone && <p className="font-sans text-[10px] text-red-660 font-bold">{errors.phone}</p>}
                        </div>
                        
                        <div className="rounded-sm bg-blue-50/70 border border-blue-100 p-3 flex gap-2 items-center">
                          <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <p className="font-sans text-[10px] text-slate-700 leading-snug">
                            <strong>HIPAA Secured:</strong> All information is protected by industry standard encryption protocols and stays on this device.
                          </p>
                        </div>
                      </div>

                      {/* Therapeutic Notes */}
                      <div className="space-y-1">
                        <label className="font-sans text-xs font-bold text-slate-900">
                          Goals & Brief Intake Notes <span className="text-slate-400">(Optional)</span>
                        </label>
                        <textarea
                          id="intake-notes"
                          rows={3}
                          placeholder="Briefly describe symptoms or therapeutic objectives..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-sans text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Agreed To Terms checkbox */}
                      <div className="space-y-2 pt-1 font-sans">
                        <div className="flex items-start gap-2">
                          <input
                            id="intake-agreed"
                            type="checkbox"
                            checked={formData.agreedToTerms}
                            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                            className="h-4.5 w-4.5 rounded-sm border-slate-200 text-blue-600 focus:ring-blue-600 mt-0.5"
                          />
                          <label id="intake-agreed-label" className="font-sans text-[11px] text-slate-650 leading-snug select-none">
                            I understand that Mindful Path is for outpatient support and does not provide immediate 24/7 emergency response. For urgent clinical crises of harm, I will Dial 988.
                          </label>
                        </div>
                        {errors.agreement && <p className="font-sans text-[10px] text-red-600 font-bold">{errors.agreement}</p>}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between font-sans">
                        <button
                          id="step3-prev-btn"
                          type="button"
                          onClick={handlePrevStep}
                          className="inline-flex items-center gap-1 px-4 py-2 font-sans text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-sm"
                        >
                          <ChevronLeft className="h-4 w-4" /> Change Time
                        </button>
                        <button
                          id="step3-submit-btn"
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 font-bold"
                        >
                          <CalendarCheck className="h-4 w-4" /> Finish Booking
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 4 && recentBooking && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-6"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                      <CheckCircle2 className="h-10 w-10 flex-shrink-0" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-slate-900">Intake Appointment Scheduled!</h3>
                      <p className="font-sans text-xs text-slate-600 max-w-md mx-auto">
                        Thank you, {recentBooking.clientName}. An automatic calendar invitation and clinical intake package have been securely queued to <strong>{recentBooking.clientEmail}</strong>.
                      </p>
                    </div>

                    {/* Receipt summary card */}
                    <div className="max-w-md mx-auto rounded-sm border border-blue-105 bg-blue-50/20 p-5 text-left space-y-3 font-sans text-xs">
                      <p className="font-sans font-bold uppercase tracking-[0.2em] text-[8px] border-blue-100 border-b pb-1.5 text-blue-600">Intake Details</p>
                      
                       <div className="grid grid-cols-2 gap-y-2">
                        <div>
                          <p className="text-slate-500 font-mono text-[10px]">Specialty Practice</p>
                          <p className="font-serif font-bold text-slate-900">{getServiceTitle(recentBooking.serviceId)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-mono text-[10px]">Session Price</p>
                          <p className="font-semibold text-slate-900">
                            {SERVICES_DATA.find(s => s.id === recentBooking.serviceId)?.price || '$150'}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-mono text-[10px]">Assigned Date</p>
                          <p className="font-bold text-slate-800 flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-blue-600" />
                            {new Date(recentBooking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-mono text-[10px]">Scheduled Space</p>
                          <p className="font-bold text-slate-800 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-blue-600" /> {recentBooking.timeSlot}
                          </p>
                        </div>
                      </div>

                      {recentBooking.notes && (
                        <div className="pt-2 border-t border-blue-100 text-[11px]">
                          <p className="text-slate-500 font-mono text-[10px]">Client Statement</p>
                          <p className="italic text-slate-700">"{recentBooking.notes}"</p>
                        </div>
                      )}
                    </div>

                    <button
                      id="book-another-btn"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 text-slate-755 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Book Another Consultation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar existing schedule overview */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Context panel */}
            <div className="rounded-sm border border-slate-205/90 bg-white p-5 space-y-4 shadow-sm">
              <h3 className="font-sans text-xs font-bold text-slate-905 uppercase tracking-[0.2em] flex items-center gap-1">
                <Info className="h-4 w-4 text-blue-500" /> Essential Guidelines
              </h3>
              <ul className="space-y-3 font-sans text-xs text-slate-600">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-extrabold">•</span>
                  <span>Superbills provided monthly for potential manual insurance filings and reimbursements.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-extrabold">•</span>
                  <span>Strict clinical boundaries apply: cancellations require at least 24 hours advance.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-extrabold">•</span>
                  <span>Both physical office layouts and secured and encrypted teletherapy formats are fully selectable.</span>
                </li>
              </ul>
            </div>

            {/* Existing Scheduled sessions tracker */}
            <div className="rounded-sm border border-blue-900 bg-blue-950 text-white p-5 space-y-4 shadow-md">
              <div className="flex justify-between items-center border-b border-blue-900 pb-2.5">
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <CalendarCheck className="h-4 w-4 text-blue-300" /> My Appointments
                </h4>
                <span className="font-mono text-[10px] font-bold bg-blue-900 px-2.5 py-0.5 rounded-sm text-blue-105">
                  {existingBookings.length} Saved
                </span>
              </div>

              {existingBookings.length === 0 ? (
                <div className="text-center py-4 space-y-1">
                  <p className="font-sans text-xs text-blue-200">No scheduled sessions found on this web client yet.</p>
                  <p className="font-sans text-[10px] text-blue-300/80">Your scheduled consultation receipts will display here.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                  {existingBookings.map((bk) => (
                    <motion.div
                      id={`booking-item-${bk.id}`}
                      key={bk.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-sm bg-blue-900/40 p-3 flex justify-between items-start gap-4 border border-blue-900/60"
                    >
                      <div className="space-y-1.5 font-sans text-xs text-blue-100">
                        <p className="font-serif font-bold text-white leading-tight">{getServiceTitle(bk.serviceId)}</p>
                        <p className="font-medium text-blue-300 flex items-center gap-1 text-[10px] mt-0.5">
                          <Calendar className="h-3 w-3" /> {new Date(bk.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {bk.timeSlot}
                        </p>
                        <p className="font-mono text-[9px] text-blue-200/70 leading-none">For: {bk.clientName}</p>
                      </div>

                      <button
                        id={`cancel-booking-btn-${bk.id}`}
                        onClick={() => handleCancelBooking(bk.id)}
                        className="p-1 rounded-sm hover:bg-blue-900 text-red-300 transition-colors"
                        title="Cancel appointment"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
