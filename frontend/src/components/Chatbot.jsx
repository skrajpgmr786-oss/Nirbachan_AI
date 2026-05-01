import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Namaste! 🙏 I am Nirbachan, your AI Election Assistant. How can I help you today? You can ask me in English, Hindi, or Bengali!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // HARDCODED LIVE API URL FOR GUARANTEED RESPONSE
  const API_URL = "https://nirbachan-api-1004786365176.asia-south1.run.app";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', text: data.reply },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', text: "Sorry, I'm having trouble connecting to the AI. Please check your internet and try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-5 rounded-2xl shadow-[0_0_20px_rgba(255,153,51,0.3)] z-50 transition-all ${
          isOpen ? 'hidden' : 'bg-[#FF9933] text-white hover:bg-[#FFAB5E]'
        }`}
      >
        <MessageSquare size={32} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-[400px] h-[550px] bg-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden glass-card"
          >
            <div className="bg-white/5 p-5 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/20 flex items-center justify-center">
                  <Bot className="text-[#FF9933] w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Nirbachan AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-400">Online Assistant</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-[#FF9933] text-white rounded-tr-none'
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-[#FF9933]" />
                    <span className="text-sm text-gray-400">Nirbachan is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-5 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask in English, Hindi, or Bengali..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white focus:outline-none focus:border-[#FF9933] transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#FF9933] rounded-xl text-white disabled:opacity-50 hover:bg-[#FFAB5E] transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
