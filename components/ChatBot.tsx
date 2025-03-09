import React, { useState, useEffect } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  // Simple keyword-based responses
  const RESPONSES: Record<string, string> = {
    hi: "Hello! Welcome to EcoMate. How can I help you with your EcoScore or e-waste reduction today?",
    hello: "Hi there! How can I help you on your eco journey?",
    "what is ecoscore": "Your EcoScore tracks your monthly environmental impact—like e-waste recycled and energy used by devices.",
    "how to recycle e-waste": "You can drop your e-waste at any certified recycling center near you. Check our app for the nearest location!",
    leaderboard: "The leaderboard shows top users who have recycled the most e-waste or reduced the most carbon footprint this month.",
    "thank you": "You’re welcome! Let’s keep our planet green together."
  };

  const getBotResponse = (userText: string): string => {
    for (const key of Object.keys(RESPONSES)) {
      if (userText.includes(key)) {
        return RESPONSES[key];
      }
    }
    return "I’m not sure about that. Try asking about EcoScore, e-waste, or the leaderboard.";
  };

  const handleSend = () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    // Add user's message
    const userMessage: Message = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);

    // Bot response
    const botMessage: Message = { sender: 'bot', text: getBotResponse(trimmedInput.toLowerCase()) };
    setMessages((prev) => [...prev, botMessage]);

    setUserInput('');
  };

  const handleQuickAction = (question: string) => {
    setUserInput(question);
    // Send immediately after setting the input
    setTimeout(() => handleSend(), 0);
  };

  return (
    <>
      <style>
        {`
          /* 
            1) Global styling: 
               - Pastel green background that fills the entire screen.
               - Zero out margin/padding on body to avoid unwanted scrollbars.
          */
          body {
            margin: 0;
            padding: 0;
            background-color: #ECF8EF; /* Soft pastel green background */
            font-family: "Segoe UI", Roboto, sans-serif;
          }

          /* 
            2) Page container:
               - Full-height flex container to center the chatbot vertically & horizontally.
          */
          .page-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px; /* Some padding so it's not flush against the edges */
          }

          /* 
            3) Chatbot card container:
               - White background with a soft box shadow & rounded corners
               - Wider max-width to appear more prominent, but still responsive
          */
          .chatbot-container {
            width: 100%;
            max-width: 700px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 24px;
          }

          .chatbot-header {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #2A7D46;
            text-align: center;
          }

          /* 
            4) Chat messages area:
               - Use clamp to let the height scale nicely with viewport.
          */
          .chatbot-messages {
            height: clamp(300px, 50vh, 600px);
            overflow-y: auto;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            padding: 10px;
            background-color: #FAFFFA;
            border-radius: 4px;
          }

          .message-row {
            margin: 8px 0;
          }

          .message-user {
            text-align: right;
          }

          .message-bot {
            text-align: left;
          }

          .message-bubble {
            display: inline-block;
            padding: 10px 14px;
            border-radius: 15px;
            max-width: 70%;
          }

          /* 
            5) Bubble colors:
               - User: light pastel green
               - Bot: white with a subtle border
          */
          .user-bubble {
            background-color: #CDEACE;
            color: #000;
          }
          .bot-bubble {
            background-color: #fff;
            border: 1px solid #D2EDE2;
            color: #000;
          }

          /* 
            6) Input & button area
          */
          .chatbot-input-area {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
          }

          .chatbot-input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          }

          .chatbot-send-btn {
            padding: 10px 16px;
            background-color: #2A7D46;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
          }

          .chatbot-send-btn:hover {
            background-color: #1D5F33;
          }

          /* 
            7) Quick action buttons:
               - Align center
               - Slightly smaller text
               - Matching green background
          */
          .chatbot-quick-actions {
            text-align: center;
          }

          .quick-action-btn {
            padding: 8px 12px;
            margin-right: 8px;
            margin-bottom: 8px;
            border: none;
            border-radius: 4px;
            background-color: #2A7D46;
            color: #fff;
            cursor: pointer;
            font-size: 0.9rem;
          }

          .quick-action-btn:hover {
            background-color: #1D5F33;
          }

          /* 
            8) Responsive adjustments:
               - On smaller screens, reduce padding for a tighter layout
          */
          @media (max-width: 600px) {
            .chatbot-container {
              padding: 16px;
            }
            .chatbot-header {
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      {/* Full-page container */}
      <div className="page-container">
        <div className="chatbot-container">
          <h2 className="chatbot-header">Chat with Eco!</h2>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-row ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
              >
                <span className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              className="chatbot-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about EcoScore, e-waste..."
            />
            <button className="chatbot-send-btn" onClick={handleSend}>
              Send
            </button>
          </div>

          <div className="chatbot-quick-actions">
            <button
              className="quick-action-btn"
              onClick={() => handleQuickAction("What is EcoScore?")}
            >
              EcoScore?
            </button>
            <button
              className="quick-action-btn"
              onClick={() => handleQuickAction("How to recycle e-waste?")}
            >
              Recycle E-Waste?
            </button>
            <button
              className="quick-action-btn"
              onClick={() => handleQuickAction("Leaderboard")}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
