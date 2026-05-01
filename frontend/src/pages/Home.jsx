import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Bot } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-saffron/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-india-green/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[60%] rounded-full bg-navy-blue/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green">World's Largest Democracy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Nirbachan is your AI-powered companion for navigating the Indian election process. Learn, prepare, and vote with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/journey"
              className="px-8 py-4 bg-saffron hover:bg-orange-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,153,51,0.4)] flex items-center gap-2 hover:scale-105"
            >
              Start Your Journey <ChevronRight size={20} />
            </Link>
            <Link
              to="/evm"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg transition-all flex items-center gap-2 backdrop-blur-sm hover:scale-105"
            >
              Try Mock EVM
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
        >
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
            <div className="w-14 h-14 bg-saffron/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-8 h-8 text-saffron" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">AI Assistant</h3>
            <p className="text-gray-400">Multilingual chatbot powered by Gemini AI to answer all your election-related queries instantly.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
            <div className="w-14 h-14 bg-india-green/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-india-green" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Mock EVM Simulator</h3>
            <p className="text-gray-400">Experience the voting process with our realistic, interactive Electronic Voting Machine simulator.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
            <div className="w-14 h-14 bg-navy-blue/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Gamified Learning</h3>
            <p className="text-gray-400">Test your knowledge with interactive quizzes, earn badges, and become an election expert.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
