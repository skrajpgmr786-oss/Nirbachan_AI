import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, MapPin } from 'lucide-react';

const turnoutData = [
  { time: '8 AM', votes: 15 },
  { time: '10 AM', votes: 35 },
  { time: '12 PM', votes: 48 },
  { time: '2 PM', votes: 55 },
  { time: '4 PM', votes: 68 },
  { time: '6 PM', votes: 72 },
];

const partyData = [
  { name: 'Progressive', value: 45, color: '#FF9933' }, // Saffron
  { name: 'Development', value: 30, color: '#138808' }, // Green
  { name: 'United', value: 20, color: '#000080' },    // Navy
  { name: 'Others', value: 5, color: '#9CA3AF' },     // Gray
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Live Election Dashboard</h1>
        <p className="text-gray-400">Simulated real-time voting data and predictions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="text-blue-400 w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Turnout</h3>
          <p className="text-3xl font-bold text-white">72.4%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-saffron/20 rounded-full flex items-center justify-center">
              <TrendingUp className="text-saffron w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-saffron bg-saffron/10 px-2 py-1 rounded-full">High</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">AI Predicted Turnout</h3>
          <p className="text-3xl font-bold text-white">75.8%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <MapPin className="text-purple-400 w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-400 bg-white/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Active Polling Stations</h3>
          <p className="text-3xl font-bold text-white">10,42,288</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl h-[400px]"
        >
          <h3 className="text-lg font-bold text-white mb-6">Voting Trend (Hourly)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={turnoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
              <XAxis dataKey="time" stroke="#9ca3af" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="votes" fill="#FF9933" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-bold text-white mb-2">Vote Distribution</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={partyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {partyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {partyData.map((party, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: party.color }} />
                <span className="text-sm text-gray-300">{party.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
