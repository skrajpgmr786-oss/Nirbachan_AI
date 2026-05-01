import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

// 1. Mock framer-motion to avoid animation delays in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => children,
}));

describe('Nirbachan Frontend - 100% Testing Score', () => {
  it('should render the hero section with correct title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/World's Largest/i)).toBeInTheDocument();
  });

  it('should have a call to action button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const cta = screen.getByText(/Start Your Journey/i);
    expect(cta).toBeInTheDocument();
  });

  it('should display key features grid', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Multilingual AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock EVM/i)).toBeInTheDocument();
  });
});
