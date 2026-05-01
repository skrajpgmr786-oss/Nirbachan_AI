import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Cpu, Trophy, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative pt-20 pb-32">
      {/* Background Ashoka Chakra */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03]">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg" 
          className="w-[800px] ashoka-spin" 
          alt="Ashoka Chakra"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8 border-india-saffron/30">
            <Zap className="w-4 h-4 text-india-saffron fill-india-saffron" />
            <span className="text-sm font-semibold tracking-wider text-india-saffron uppercase">AI-Powered Election Guide</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Empowering the <br />
            <span className="text-gradient">World's Largest</span> <br />
            Democracy
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Nirbachan is your premium AI-powered companion for navigating the Indian election process. 
            Learn, prepare, and participate with futuristic tools and real-time insights.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/journey" className="btn-premium bg-india-saffron text-white shadow-india-saffron/20 group">
              Start Your Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/evm" className="btn-premium glass-card hover:bg-white/10">
              Try Mock EVM
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            variants={itemVariants}
            icon={<MessageSquare className="w-8 h-8 text-india-saffron" />}
            title="Multilingual AI Assistant"
            desc="Chat with our Gemini-powered bot in English, Hindi, or Bengali for instant election support."
            color="border-india-saffron/20"
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<ShieldCheck className="w-8 h-8 text-india-white" />}
            title="EVM & Biometric Simulator"
            desc="Experience a realistic, high-fidelity voting process with VVPAT and biometric simulation."
            color="border-white/20"
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<Trophy className="w-8 h-8 text-india-green" />}
            title="Gamified Awareness"
            desc="Take interactive quizzes, earn civic badges, and level up your democratic knowledge."
            color="border-india-green/20"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-32 glass-card p-12 border-india-navy/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-india-navy/10 blur-[100px] -z-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="96.8Cr+" label="Eligible Voters" />
            <StatItem value="10L+" label="Polling Stations" />
            <StatItem value="543" label="LS Constituencies" />
            <StatItem value="28" label="States & 8 UTs" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -10 }}
    className={`glass-card p-10 border ${color} hover:border-white/30 transition-all duration-500`}
  >
    <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const StatItem = ({ value, label }) => (
  <div>
    <div className="text-4xl font-black text-india-white mb-2 font-['Outfit']">{value}</div>
    <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">{label}</div>
  </div>
);

export default Home;
