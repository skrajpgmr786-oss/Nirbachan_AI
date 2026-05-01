import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle, AlertTriangle, Info, Printer } from 'lucide-react';

const EVMSimulator = () => {
  const [step, setStep] = useState('biometric');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVVPAT, setShowVVPAT] = useState(false);

  const candidates = [
    { id: 1, name: "Arjun Singh", party: "Democratic Party", symbol: "🪷" },
    { id: 2, name: "Meera Devi", party: "People's Union", symbol: "🖐️" },
    { id: 3, name: "Sanjay Kumar", party: "National Front", symbol: "🐘" },
    { id: 4, name: "Priya Roy", party: "Secular Alliance", symbol: "🚜" },
  ];

  const handleBiometric = () => {
    setTimeout(() => setStep('voting'), 1500);
  };

  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
    setStep('vvpat');
    setShowVVPAT(true);
    setTimeout(() => {
      setShowVVPAT(false);
      setStep('confirmed');
    }, 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black mb-4">Mock <span className="text-gradient">EVM</span> Simulator</h1>
        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
          Experience the high-security Indian voting process. From biometric verification to VVPAT confirmation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step Indicator */}
        <div className="md:col-span-1 space-y-4">
          <StatusStep active={step === 'biometric'} done={step !== 'biometric'} label="1. Identity Verification" />
          <StatusStep active={step === 'voting'} done={['vvpat', 'confirmed'].includes(step)} label="2. Cast Your Vote" />
          <StatusStep active={step === 'vvpat'} done={step === 'confirmed'} label="3. VVPAT Confirmation" />
          <StatusStep active={step === 'confirmed'} done={false} label="4. Process Complete" />
        </div>

        {/* Main Interface */}
        <div className="md:col-span-2">
          <div className="glass-card p-8 border-white/10 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <VoteIcon className="w-24 h-24" />
            </div>

            <AnimatePresence mode="wait">
              {step === 'biometric' && (
                <motion.div 
                  key="biometric"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-8 bg-india-saffron/10 rounded-full w-fit mx-auto mb-8 border-2 border-india-saffron/30"
                  >
                    <Fingerprint className="w-20 h-20 text-india-saffron" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">Biometric Verification</h3>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto">Please "scan" your fingerprint to unlock the voting console.</p>
                  <button 
                    onClick={handleBiometric}
                    className="btn-premium bg-india-saffron text-white w-full max-w-xs mx-auto"
                  >
                    Start Verification
                  </button>
                </motion.div>
              )}

              {step === 'voting' && (
                <motion.div 
                  key="voting"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold">Ballot Unit</h3>
                    <div className="px-3 py-1 bg-india-green/20 text-india-green rounded-full text-xs font-bold animate-pulse">READY TO VOTE</div>
                  </div>
                  <div className="space-y-4">
                    {candidates.map((c) => (
                      <button 
                        key={c.id}
                        onClick={() => handleVote(c)}
                        className="w-full p-6 glass-card hover:bg-white/10 border-white/5 flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{c.symbol}</span>
                          <div className="text-left">
                            <div className="font-bold text-lg">{c.name}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{c.party}</div>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-india-navy group-hover:bg-india-navy flex items-center justify-center transition-colors shadow-inner" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'vvpat' && (
                <motion.div 
                  key="vvpat"
                  className="text-center w-full"
                >
                  <div className="glass-card p-8 border-india-green/30 bg-black/40 inline-block mb-8 relative">
                    <div className="absolute -top-3 -right-3 p-2 bg-india-green rounded-full shadow-lg shadow-india-green/20">
                      <Printer className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-5xl mb-4">{selectedCandidate.symbol}</div>
                    <div className="font-bold text-xl">{selectedCandidate.name}</div>
                    <div className="text-xs text-gray-500 mb-4">{selectedCandidate.party}</div>
                    <div className="text-[10px] text-gray-600 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">VVPAT Confirmation</h3>
                  <p className="text-gray-400">Verifying your vote paper trail. This slip will drop into the sealed box in 7 seconds.</p>
                </motion.div>
              )}

              {step === 'confirmed' && (
                <motion.div 
                  key="confirmed"
                  className="text-center"
                >
                  <CheckCircle className="w-24 h-24 text-india-green mx-auto mb-8 drop-shadow-[0_0_15px_rgba(19,136,8,0.5)]" />
                  <h3 className="text-3xl font-black mb-4">Vote Recorded!</h3>
                  <p className="text-gray-400 mb-12">Thank you for participating in the democratic process.</p>
                  <button 
                    onClick={() => setStep('biometric')}
                    className="btn-premium bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    Restart Simulator
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusStep = ({ active, done, label }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
    active ? 'glass-card border-india-saffron/50 translate-x-2' : ''
  }`}>
    <div className={`w-3 h-3 rounded-full ${
      done ? 'bg-india-green' : active ? 'bg-india-saffron animate-pulse' : 'bg-white/10'
    }`} />
    <span className={`font-bold text-sm ${
      active ? 'text-india-saffron' : done ? 'text-india-green' : 'text-gray-500'
    }`}>{label}</span>
  </div>
);

const VoteIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 12 2 2 4-4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" />
  </svg>
);

export default EVMSimulator;
