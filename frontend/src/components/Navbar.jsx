import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Vote, Home as HomeIcon, Timeline, BarChart3, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'Journey', path: '/journey', icon: <Timeline className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Quiz', path: '/quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Mock EVM', path: '/evm', icon: <Vote className="w-4 h-4" /> },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className={`glass-card px-8 py-3 flex items-center justify-between border-white/5 shadow-2xl transition-all duration-500 ${
          scrolled ? 'bg-black/60' : 'bg-white/5'
        }`}>
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-india-saffron rounded-lg"
            aria-label="Nirbachan Home"
          >
            <div className="p-2 bg-india-saffron rounded-xl group-hover:rotate-12 transition-transform duration-500">
              <Vote className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase font-['Outfit']">
              NIRBACHAN<span className="text-india-saffron">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors group flex items-center gap-2 ${
                    location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-india-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:ring-2 focus:ring-india-saffron rounded-lg" 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 glass-card p-6 border-white/10 overflow-hidden shadow-2xl flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-semibold text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
