import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-white font-sans selection:bg-saffron/30">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Chatbot />
      <footer className="py-6 text-center text-sm text-gray-400 border-t border-white/10 mt-auto">
        <p>© {new Date().getFullYear()} Nirbachan AI. Building a stronger democracy.</p>
      </footer>
    </div>
  );
};

export default Layout;
