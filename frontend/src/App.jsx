import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import EVMSimulator from './pages/EVMSimulator';
import Journey from './pages/Journey';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="evm" element={<EVMSimulator />} />
          <Route path="journey" element={<Journey />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
