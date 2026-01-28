import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import axios from 'axios'; // Import axios for API calls
import { useCart } from '../context/CartContext';
import { API_URL } from '../api';
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your FoodDel Guide. I can recommend dishes or help with your order. Ask me anything!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

    const handleSend = async (e) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage = { text: input, isBot: false };
      setMessages((prev) => [...prev, userMessage]);
      const currentPrompt = input;
      setInput("");
      setIsLoading(true);

      try {
        // API call to your backend route
        // const response = await axios.post("http://localhost:5000/api/ai/chat", { 
        //   prompt: currentPrompt 
        // });
        const response = await axios.post(`${API_URL}/ai/chat`, {
    prompt: currentPrompt 
});
        const botResponse = { text: response.data.text, isBot: true };
        setMessages((prev) => [...prev, botResponse]);
      } catch (err) {
        console.error("AI Error:", err);
        setMessages((prev) => [...prev, { 
          text: "I'm having trouble connecting to my brain. Please check your backend and API key.", 
          isBot: true 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    
  // return (
  //   <div className="fixed bottom-6 right-6 z-[60]">
  //     {/* Chat Window */}
  //     {isOpen && (
  //       <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 mb-4 animate-in slide-in-from-bottom-5">
  //         <div className="bg-cyan-900 p-4 text-white flex justify-between items-center">
  //           <div className="flex items-center gap-2">
  //             <Sparkles size={18} className="text-orange-400" />
  //             <span className="font-bold">FoodDel Assistant</span>
  //           </div>
  //           <button onClick={() => setIsOpen(false)}><X size={20} /></button>
  //         </div>

  //         {/* Messages Display */}
  //         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
  //           {messages.map((msg, i) => (
  //             <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
  //               <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
  //                 msg.isBot ? 'bg-white text-gray-800 shadow-sm' : 'bg-orange-600 text-white'
  //               }`}>
  //                 {msg.text}
  //               </div>
  //             </div>
  //           ))}
  //           {isLoading && (
  //             <div className="flex justify-start">
  //               <div className="bg-white p-3 rounded-2xl shadow-sm text-xs text-gray-400 animate-pulse">
  //                 AI is thinking...
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         {/* Input Form */}
  //         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
  //           <input 
  //             value={input}
  //             onChange={(e) => setInput(e.target.value)}
  //             placeholder="Ask about Sushi, Pizza, or your order..." 
  //             className="flex-1 text-sm outline-none p-2"
  //             disabled={isLoading}
  //           />
  //           <button 
  //             type="submit" 
  //             className={`text-orange-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  //             disabled={isLoading}
  //           >
  //             <Send size={20} />
  //           </button>
  //         </form>
  //       </div>
  //     )}

  //     {/* Floating Toggle Button */}
  //     <button 
  //       onClick={() => setIsOpen(!isOpen)}
  //       className="bg-orange-600 text-white p-4 rounded-full shadow-xl hover:bg-orange-700 transition-transform active:scale-90"
  //     >
  //       {isOpen ? <X size={28} /> : <Bot size={28} />}
  //     </button>
  //   </div>
  // );
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-60">
      {/* Chat Window */}
      {isOpen && (
        <div className="
          bg-white 
          /* Mobile: Take up screen width minus padding | Desktop: 320px width */
          w-[calc(100vw-2rem)] sm:w-80 
          /* Flexible height: 384px on desktop, but max 70% of screen on mobile */
          h-96 max-h-[70vh] sm:max-h-[500px] 
          rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 
          mb-4 animate-in slide-in-from-bottom-5
        ">
          <div className="bg-cyan-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-orange-400" />
              <span className="font-bold text-sm sm:text-base">FoodDel Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Display */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm ${
                  msg.isBot ? 'bg-white text-gray-800 shadow-sm' : 'bg-orange-600 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-xs text-gray-400 animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-1 text-xs sm:text-sm outline-none p-2 bg-gray-50 rounded-lg"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={`text-orange-600 p-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-600 text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-orange-700 transition-transform active:scale-90"
        >
          {isOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Bot size={24} className="sm:w-7 sm:h-7" />}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;