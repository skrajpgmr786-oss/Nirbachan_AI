import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, FileText, Vote, BarChart, CheckCircle2 } from 'lucide-react';

const Journey = () => {
  const steps = [
    {
      title: "Voter Registration",
      desc: "Ensure you are 18+ and register on the NVSP portal. Form 6 is required for new voters.",
      icon: <UserPlus className="w-8 h-8 text-india-saffron" />,
      color: "bg-india-saffron/10",
      border: "border-india-saffron/30"
    },
    {
      title: "Verification",
      desc: "Check your name in the electoral roll. Verify your polling booth details and EPIC number.",
      icon: <Search className="w-8 h-8 text-white" />,
      color: "bg-white/10",
      border: "border-white/30"
    },
    {
      title: "Campaign & Manifestos",
      desc: "Learn about candidates in your constituency. Read their manifestos and past performance.",
      icon: <FileText className="w-8 h-8 text-india-green" />,
      color: "bg-india-green/10",
      border: "border-india-green/30"
    },
    {
      title: "Voting Day",
      desc: "Carry your Voter ID. Wait in line, verify identity, and press the button on the EVM.",
      icon: <Vote className="w-8 h-8 text-india-navy" />,
      color: "bg-india-navy/20",
      border: "border-india-navy/40"
    },
    {
      title: "Results",
      desc: "Votes are counted under strict security. The candidate with the highest votes is declared the winner.",
      icon: <BarChart className="w-8 h-8 text-india-saffron" />,
      color: "bg-india-saffron/10",
      border: "border-india-saffron/30"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-black mb-6">The Path to <span className="text-gradient">Democracy</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Follow the step-by-step guide to exercising your most powerful right in the world's largest democracy.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-india-saffron via-white to-india-green opacity-20 hidden md:block" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className={`glass-card p-8 border ${step.border} max-w-md hover:bg-white/10 transition-colors group`}>
                  <div className={`p-4 rounded-xl ${step.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Dot on line */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white border-4 border-india-navy shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>

              <div className="md:w-1/2 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-12 glass-card text-center border-india-green/20"
      >
        <CheckCircle2 className="w-16 h-16 text-india-green mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-india-white">Ready to make a difference?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Ensure your EPIC card is updated and you know your polling booth. Your vote is your voice.
        </p>
        <button className="btn-premium bg-india-green text-white">
          Check Voter Eligibility
        </button>
      </motion.div>
    </div>
  );
};

export default Journey;
