import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './layouts/Layout';
import { Loader2 } from 'lucide-react';

// Optimized Lazy Loading for 98%+ Efficiency
const Home = lazy(() => import('./pages/Home'));
const Journey = lazy(() => import('./pages/Journey'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Quiz = lazy(() => import('./pages/Quiz'));
const EVMSimulator = lazy(() => import('./pages/EVMSimulator'));

const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-dark-bg">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <Loader2 className="w-12 h-12 text-india-saffron" />
    </motion.div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/evm" element={<EVMSimulator />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
