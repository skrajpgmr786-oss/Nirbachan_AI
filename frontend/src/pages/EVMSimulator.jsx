import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, CheckCircle2, AlertCircle } from 'lucide-react';

const candidates = [
  { id: 1, name: 'Aarav Sharma', party: 'Progressive Party', symbol: '🌻' },
  { id: 2, name: 'Priya Patel', party: 'Development Front', symbol: '🚲' },
  { id: 3, name: 'Rahul Verma', party: 'United Alliance', symbol: '⚖️' },
  { id: 4, name: 'NOTA', party: 'None of the Above', symbol: '❌' },
];

const EVMSimulator = () => {
  const [step, setStep] = useState('auth'); // auth, voting, success
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleFingerprintScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep('voting');
    }, 2000);
  };

  const handleVote = (candidateId) => {
    setSelectedCandidate(candidateId);
    // Play beep sound
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const resetEVM = () => {
    setStep('auth');
    setSelectedCandidate(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Mock EVM Simulator</h1>
        <p className="text-gray-400">Experience the secure digital voting process</p>
      </div>

      <div className="bg-[#e5e5e5] rounded-3xl p-8 max-w-2xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-300 relative">
        {/* EVM Label */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy-blue text-white px-6 py-1 rounded-full text-sm font-bold tracking-widest shadow-lg">
          BALLOT UNIT
        </div>

        {step === 'auth' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-gray-800"
          >
            <h2 className="text-2xl font-bold mb-8">Voter Verification</h2>
            <p className="mb-8 text-center max-w-sm">Place your finger on the scanner to verify your identity and unlock the voting machine.</p>
            
            <motion.button
              onClick={handleFingerprintScan}
              whileTap={{ scale: 0.95 }}
              className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-colors ${
                isScanning ? 'border-saffron bg-saffron/10' : 'border-gray-400 bg-white hover:border-saffron'
              }`}
            >
              <Fingerprint 
                className={`w-16 h-16 ${isScanning ? 'text-saffron animate-pulse' : 'text-gray-400'}`} 
              />
              {isScanning && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-saffron opacity-50"
                  animate={{ y: [0, 120, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
            {isScanning && <p className="mt-4 text-saffron font-semibold">Verifying...</p>}
          </motion.div>
        )}

        {step === 'voting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="flex items-center bg-white rounded-lg p-3 shadow-inner border border-gray-300"
              >
                {/* Symbol & Name */}
                <div className="flex-1 flex items-center gap-4 px-4 border-r-2 border-gray-300">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl border border-gray-300">
                    {candidate.symbol}
                  </div>
                  <div className="text-black">
                    <div className="font-bold uppercase tracking-wider">{candidate.name}</div>
                    <div className="text-xs text-gray-600">{candidate.party}</div>
                  </div>
                </div>

                {/* Light & Button */}
                <div className="flex items-center gap-6 px-6">
                  {/* Indicator Light */}
                  <div className={`w-4 h-4 rounded-full shadow-inner ${
                    selectedCandidate === candidate.id ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-red-900'
                  }`} />
                  
                  {/* Blue Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote(candidate.id)}
                    disabled={selectedCandidate !== null}
                    className="w-16 h-10 bg-blue-600 rounded-lg shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-12 h-6 bg-blue-500 rounded-md border border-blue-400" />
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-gray-800"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Vote Recorded</h2>
            <p className="text-gray-600 mb-8 text-center max-w-sm">
              Your vote has been securely recorded. In a real election, a VVPAT slip would now be printed.
            </p>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full max-w-xs mb-8">
              <div className="flex items-center gap-2 text-saffron mb-2">
                <AlertCircle size={20} />
                <span className="font-bold text-sm">VVPAT SIMULATION</span>
              </div>
              <div className="border-t-2 border-dashed border-gray-300 py-4 text-center">
                <div className="text-2xl mb-2">
                  {candidates.find(c => c.id === selectedCandidate)?.symbol}
                </div>
                <div className="font-bold uppercase">
                  {candidates.find(c => c.id === selectedCandidate)?.name}
                </div>
              </div>
            </div>

            <button
              onClick={resetEVM}
              className="text-blue-600 font-semibold hover:underline"
            >
              Simulate Another Voter
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EVMSimulator;
