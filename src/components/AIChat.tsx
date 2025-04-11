
import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'ai', content: 'Hi there! I\'m Susmita\'s AI assistant. How can I help you learn more about Susmita Giri and her content?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple predefined responses based on keywords
      let aiResponse = "I'm not sure about that. Try asking me about Susmita's content, her TikTok videos, or how to contact her!";

      const userMessageLower = userMessage.toLowerCase();
      
      if (userMessageLower.includes("tiktok") || userMessageLower.includes("videos")) {
        aiResponse = "Susmita creates various TikTok content including travel adventures, cooking delights, and creative acting videos. You can follow her at @susmitagiri56 on TikTok!";
      } else if (userMessageLower.includes("nepal") || userMessageLower.includes("from")) {
        aiResponse = "Susmita Giri is a content creator and TikTok enthusiast from Nepal. She loves showcasing her culture and daily life through her content!";
      } else if (userMessageLower.includes("contact") || userMessageLower.includes("reach")) {
        aiResponse = "You can contact Susmita through the contact form on this website or through her social media profiles linked at the top of the page.";
      } else if (userMessageLower.includes("photography") || userMessageLower.includes("photos")) {
        aiResponse = "Photography is one of Susmita's passions. She captures beautiful moments of Nepal's landscapes, cultural experiences, and daily life through her lens.";
      } else if (userMessageLower.includes("hello") || userMessageLower.includes("hi") || userMessageLower.includes("hey")) {
        aiResponse = "Hello! I'm Susmita's AI assistant. How can I help you today?";
      }

      // Add AI response
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button (always visible) */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-40 flex items-center justify-center"
        aria-label="Chat with AI assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 flex flex-col max-h-[600px] border border-gray-200">
          {/* Chat header */}
          <div className="p-4 bg-primary text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="mr-2" size={20} />
              <h3 className="font-medium">Susmita's AI Assistant</h3>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white/80 hover:text-white"
              aria-label="Minimize chat"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground border border-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg p-3 bg-white text-foreground border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Ask about Susmita..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`ml-2 text-primary ${isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary/80'}`}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
