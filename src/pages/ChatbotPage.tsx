import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, MessageCircle, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'image';
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Eye Care Assistant. I can help you understand eye diseases, symptoms, treatments, and prevention methods. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const predefinedQuestions = [
    "What are common symptoms of diabetic retinopathy?",
    "How can I prevent cataracts?",
    "What causes dry eyes?",
    "When should I see an eye doctor?",
    "How does glaucoma develop?",
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const responses = {
      diabetic: "Diabetic retinopathy is a serious eye condition that can develop in people with diabetes. Common symptoms include:\n\n• Blurred or fluctuating vision\n• Dark spots or strings floating in your vision\n• Difficulty seeing at night\n• Colors appearing faded\n• Progressive vision loss\n\nEarly stages may have no symptoms, which is why regular eye exams are crucial for people with diabetes. Would you like to know more about prevention or treatment options?",
      cataracts: "Cataracts develop when the lens of your eye becomes cloudy. Prevention strategies include:\n\n• Protecting your eyes from UV radiation with sunglasses\n• Maintaining a healthy diet rich in antioxidants\n• Avoiding smoking and excessive alcohol\n• Managing diabetes and other health conditions\n• Regular eye examinations\n\nWhile cataracts are often age-related and can't be completely prevented, these steps can help delay their onset.",
      "dry eyes": "Dry eyes occur when your tears aren't able to provide adequate lubrication. Common causes include:\n\n• Age-related changes\n• Environmental factors (wind, dry air)\n• Extended screen time\n• Certain medications\n• Medical conditions like Sjögren's syndrome\n\nTreatment options include artificial tears, lifestyle changes, and in some cases, prescription medications. Would you like specific recommendations for managing dry eyes?",
      default: "Thank you for your question about eye health. Based on current medical knowledge, I recommend consulting with an ophthalmologist for personalized advice about your specific concerns. Regular eye exams are important for maintaining good vision and detecting problems early. Is there a specific aspect of eye health you'd like to know more about?"
    };

    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('diabetic') || lowercaseInput.includes('retinopathy')) {
      return responses.diabetic;
    } else if (lowercaseInput.includes('cataract')) {
      return responses.cataracts;
    } else if (lowercaseInput.includes('dry') && lowercaseInput.includes('eye')) {
      return responses["dry eyes"];
    } else {
      return responses.default;
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputValue("What are the symptoms of glaucoma?");
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: "I've uploaded an eye image for analysis. Can you help me understand what this might show?",
        sender: 'user',
        timestamp: new Date(),
        type: 'image'
      };

      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI image analysis response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I can see you've uploaded an image. While I can provide general information about eye conditions, I cannot diagnose specific conditions from images. For accurate medical analysis of eye images, I recommend using our AI Scanner feature or consulting with an ophthalmologist. Would you like me to explain what to look for in general eye health or guide you to our scanning tool?",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gradient mb-4">AI Eye Care Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about eye diseases, symptoms, and treatments from our AI-powered assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-glass animate-slideInRight">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MessageCircle className="text-primary" size={20} />
                  <span>Quick Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-sm hover:bg-secondary"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="card-glass h-[600px] flex flex-col animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                    <Badge variant="secondary" className="text-xs">Online</Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        } animate-fadeInUp`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                          <div className={`rounded-2xl px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex items-start space-x-3 animate-fadeInUp">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-secondary rounded-2xl px-4 py-2">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`flex-shrink-0 ${isListening ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <Mic size={16} className={isListening ? 'animate-pulse' : ''} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-shrink-0"
                  >
                    <Image size={16} />
                  </Button>

                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about eye health, symptoms, or treatments..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="btn-primary flex-shrink-0"
                  >
                    <Send size={16} />
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;