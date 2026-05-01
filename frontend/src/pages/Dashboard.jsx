import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Building2, MapPin, TrendingUp, Info } from 'lucide-react';

const Dashboard = () => {
  const voterData = [
    { year: '2004', turnout: 58.1 },
    { year: '2009', turnout: 58.2 },
    { year: '2014', turnout: 66.4 },
    { year: '2019', turnout: 67.4 },
    { year: '2024', turnout: 66.8 },
  ];

  const demographicData = [
    { name: '18-25', value: 20 },
    { name: '26-45', value: 45 },
    { name: '46-60', value: 25 },
    { name: '60+', value: 10 },
  ];

  const COLORS = ['#FF9933', '#138808', '#000080', '#FFFFFF'];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
      >
        <div>
          <h1 className="text-5xl font-black mb-4">Election <span className="text-gradient">Insights</span></h1>
          <p className="text-gray-400 text-lg">Real-time data and historical trends of the Indian electoral landscape.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 glass-card border-india-green/30 text-india-green text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-india-green animate-ping" />
            LIVE DATA FEED
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Users className="text-india-saffron" />} label="Total Voters" value="96.8 Cr" change="+6.5%" />
        <StatCard icon={<Building2 className="text-india-white" />} label="Constituencies" value="543" change="0.0%" />
        <StatCard icon={<MapPin className="text-india-green" />} label="Polling Booths" value="10.5 L" change="+12%" />
        <StatCard icon={<TrendingUp className="text-india-navy" />} label="Avg Turnout" value="67.1%" change="+0.7%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Turnout Trend */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-8 border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Voter Turnout Trend (General Elections)</h3>
            <Info className="w-4 h-4 text-gray-600" />
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={voterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="year" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="turnout" 
                  stroke="#FF9933" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#FF9933', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Demographics */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-card p-8 border-white/5"
        >
          <h3 className="text-xl font-bold mb-8">Voter Demographics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #333', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-8">
            {demographicData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-gray-400">{item.name} Age Group</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, change }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 border-white/5 relative overflow-hidden group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-md ${
        change.startsWith('+') ? 'bg-india-green/20 text-india-green' : 'bg-gray-500/20 text-gray-400'
      }`}>
        {change}
      </div>
    </div>
    <div className="text-3xl font-black mb-1 font-['Outfit']">{value}</div>
    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</div>
  </motion.div>
);

export default Dashboard;
