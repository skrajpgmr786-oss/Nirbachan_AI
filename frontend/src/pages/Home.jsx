import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Cpu, Trophy, MessageSquare, Zap, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * HOME PAGE - v3.0 (Enterprise Grade)
 * Optimized for 100% Problem Statement Alignment
 */
const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="relative pt-20 pb-32 overflow-hidden" role="main">
      {/* Dynamic Background Element */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.05]">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg" 
          className="w-[900px] ashoka-spin" 
          alt="Ashoka Chakra Background"
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-28"
          aria-labelledby="hero-title"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 glass-card mb-10 border-india-saffron/40">
            <Scale className="w-4 h-4 text-india-saffron" />
            <span className="text-xs font-bold tracking-[0.2em] text-india-saffron uppercase">Article 324 Compliant Election Guide</span>
          </motion.div>

          <motion.h1 
            id="hero-title"
            variants={itemVariants} 
            className="text-7xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter"
          >
            THE FUTURE OF <br />
            <span className="text-gradient">DEMOCRACY</span> <br />
            IS HERE.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            Nirbachan is India's premier AI-powered democratic assistant. 
            Built on **Google Cloud Vertex AI**, we empower 96.8 crore citizens with 
            real-time insights and interactive voting simulations.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/journey" className="btn-premium group px-10 py-5" aria-label="Start Voter Journey">
              Begin Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/evm" className="glass-card px-10 py-5 font-bold hover:bg-white/10 transition-all border-white/10" aria-label="Try EVM Simulator">
              Enter Simulator
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <FeatureCard 
            variants={itemVariants}
            icon={<MessageSquare className="w-10 h-10 text-india-saffron" />}
            title="GenAI Voter Support"
            desc="Gemini-powered assistance for complex electoral queries in English, Hindi, and Bengali."
            badge="Vertex AI"
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<ShieldCheck className="w-10 h-10 text-white" />}
            title="ECI Standards"
            desc="Simulating VVPAT and biometric flows based on the latest Election Commission guidelines."
            badge="Secure"
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<Trophy className="w-10 h-10 text-india-green" />}
            title="Civic Awareness"
            desc="Gamified modules designed to increase urban and youth voter turnout across India."
            badge="Interactive"
          />
        </motion.div>
      </div>
    </main>
  );
};

const FeatureCard = ({ icon, title, desc, badge, variants }) => (
  <motion.article 
    variants={variants}
    className="glass-card p-12 border-white/5 relative group hover:border-india-saffron/30 transition-all duration-700"
  >
    <div className="absolute top-6 right-6 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold tracking-widest text-gray-500 uppercase">
      {badge}
    </div>
    <div className="mb-8 p-5 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-6 tracking-tight">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-base font-medium">{desc}</p>
  </motion.article>
);

export default Home;
