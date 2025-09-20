"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  X, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं RailSahayak AI असिस्टेंट हूं। आपकी शिकायत में कैसे मदद कर सकता हूं? / Hello! I\'m RailSahayak AI Assistant. How can I help you with your complaint today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: {
      en: "Hello! I'm here to help you with your railway complaints. You can ask me about complaint status, filing procedures, or any other railway-related queries.",
      hi: "नमस्ते! मैं आपकी रेलवे शिकायतों में मदद करने के लिए यहां हूं। आप मुझसे शिकायत की स्थिति, फाइलिंग प्रक्रिया, या किसी अन्य रेलवे संबंधी प्रश्न के बारे में पूछ सकते हैं।"
    },
    complaintStatus: {
      en: "To check your complaint status, please provide your complaint ID (e.g., RC001). I can also help you track complaints via PNR number or phone number.",
      hi: "अपनी शिकायत की स्थिति जांचने के लिए, कृपया अपनी शिकायत आईडी (जैसे RC001) प्रदान करें। मैं पीएनआर नंबर या फोन नंबर के माध्यम से शिकायतों को ट्रैक करने में भी मदद कर सकता हूं।"
    },
    fileComplaint: {
      en: "I can help you file a complaint! Please tell me: 1) Type of issue 2) Train number 3) Coach/seat details 4) Brief description. I'll guide you through the process.",
      hi: "मैं आपको शिकायत दर्ज करने में मदद कर सकता हूं! कृपया मुझे बताएं: 1) समस्या का प्रकार 2) ट्रेन नंबर 3) कोच/सीट विवरण 4) संक्षिप्त विवरण। मैं आपको प्रक्रिया के माध्यम से मार्गदर्शन करूंगा।"
    }
  };

  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('status') || lowerMessage.includes('track') || lowerMessage.includes('स्थिति')) {
      return 'complaintStatus';
    } else if (lowerMessage.includes('file') || lowerMessage.includes('complaint') || lowerMessage.includes('शिकायत')) {
      return 'fileComplaint';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('नमस्ते')) {
      return 'greeting';
    }
    return 'general';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const intent = detectIntent(inputMessage);
      let botResponse = '';

      if (intent === 'general') {
        botResponse = currentLanguage === 'hi' 
          ? "मैं समझ गया। क्या आप अधिक विवरण दे सकते हैं? मैं आपकी बेहतर सहायता कर सकूंगा।"
          : "I understand. Could you provide more details? I'll be better able to assist you.";
      } else {
        botResponse = predefinedResponses[intent as keyof typeof predefinedResponses][currentLanguage as 'en' | 'hi'];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        language: currentLanguage
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { text: 'Check Status', action: () => setInputMessage('Check my complaint status') },
    { text: 'File Complaint', action: () => setInputMessage('I want to file a complaint') },
    { text: 'Train Info', action: () => setInputMessage('Get train information') },
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-blue-200">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              RailSahayak AI
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                {currentLanguage === 'en' ? 'English' : 'हिंदी'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'hi' : 'en')}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                A
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white ml-2'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 mr-2'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'bot' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                          )}
                          {message.type === 'user' && (
                            <User className="h-4 w-4 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mr-2">
                        <div className="flex items-center space-x-1">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex space-x-2 mb-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="text-xs"
                      >
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={currentLanguage === 'en' ? 'Type your message...' : 'अपना संदेश लिखें...'}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}