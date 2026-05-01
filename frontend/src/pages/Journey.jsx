import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Vote, FileCheck, PartyPopper } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'Ensure you are 18+ and register on the NVSP portal. Form 6 is required for new voters.',
    icon: UserPlus,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
  },
  {
    id: 2,
    title: 'Verification',
    description: 'Check your name in the electoral roll. Verify your polling booth details and EPIC number.',
    icon: Search,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/20',
  },
  {
    id: 3,
    title: 'Campaign & Manifestos',
    description: 'Learn about candidates in your constituency. Read their manifestos and past performance.',
    icon: FileCheck,
    color: 'text-saffron',
    bgColor: 'bg-saffron/20',
  },
  {
    id: 4,
    title: 'Voting Day',
    description: 'Carry your Voter ID or approved document. Wait in line, verify identity, and press the button on the EVM.',
    icon: Vote,
    color: 'text-india-green',
    bgColor: 'bg-india-green/20',
  },
  {
    id: 5,
    title: 'Results',
    description: 'Votes are counted under strict security. The candidate with the highest votes is declared the winner.',
    icon: PartyPopper,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/20',
  },
];

const Journey = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Election Journey</h1>
        <p className="text-xl text-gray-400">Step-by-step guide to participating in the world's largest democracy</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={step.id}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 w-16 h-16 flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full ${step.bgColor} animate-ping opacity-20`} />
                  <div className={`w-full h-full rounded-full bg-bg-dark border-4 border-white/10 flex items-center justify-center ${step.bgColor}`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="w-full md:w-5/12 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Journey;
