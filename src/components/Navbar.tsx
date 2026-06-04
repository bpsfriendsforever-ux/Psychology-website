import React from 'react';
import { Brain, Menu, X, CalendarCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Welcome' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Session' },
    { id: 'blog', label: 'Reflection Blog' },
    { id: 'contact', label: 'Contact & FAQs' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-600/95 backdrop-blur-md text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo and Brand - Georgia Serif style */}
        <div 
          id="navbar-brand"
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
          onClick={() => handleNavClick('home')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white">
              Mindful Path
            </h1>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-blue-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-2.5 w-2.5" /> Clinical Psychology
            </p>
          </div>
        </div>

        {/* Desktop Navigation - Clean Minimalist Uppercase */}
        <nav id="navbar-desktop-nav" className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? 'text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Key - Squared rounded-sm safe blue button */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-cta-btn"
            onClick={() => handleNavClick('booking')}
            className="flex items-center space-x-2 rounded-sm bg-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-blue-600 transition-all duration-200 hover:bg-blue-50 active:scale-95 shadow-sm font-bold"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Book Intake</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-sm p-2 text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-b border-blue-700 bg-blue-600">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full px-4 py-3 text-left font-sans text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-blue-700 text-white border-l-4 border-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-blue-500">
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleNavClick('booking')}
                className="flex w-full items-center justify-center space-x-2 rounded-sm bg-white py-3 font-sans text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm hover:bg-blue-50 font-bold"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>Book Intake</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
