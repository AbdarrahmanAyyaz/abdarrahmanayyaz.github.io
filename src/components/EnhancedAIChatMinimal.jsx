import React, { useState } from 'react';
import PersonalizedAvatar from './PersonalizedAvatar';
import ChatMessageSimple from './ChatMessageSimple';
import ChatSessionManager from './ChatSessionManager';

const EnhancedAIChatMinimal = () => {
  const [messages] = useState([
    {
      id: 1,
      text: "Hello! I'm AI Abdarrahman 👋 Testing minimal enhanced chat...",
      type: 'ai',
      timestamp: new Date()
    }
  ]);

  const handleChatChange = (chatId, isNewChat) => {
    console.log('Chat changed:', chatId, isNewChat);
  };

  return (
    <div className="enhanced-ai-chat w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-surface/95 via-surface/90 to-surface/95 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-accent/10">
        
        {/* ChatSessionManager commented out - testing without it */}
        {/* <ChatSessionManager 
          onChatChange={handleChatChange}
          currentChatId={1}
          maxChats={3}
        /> */}
        
        {/* Simple Header with Avatar */}
        <div className="chat-header p-6 bg-gradient-to-r from-surface/60 via-accent/10 to-surface/60 backdrop-blur-sm border-b border-border/30">
          <div className="flex items-center gap-4">
            <PersonalizedAvatar state="idle" size={72} />
            <div>
              <h2 className="text-2xl font-bold text-text">
                AI Abdarrahman - Testing Avatar
              </h2>
              <p className="text-muted mt-1">
                Testing PersonalizedAvatar component...
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area - Testing ChatMessageSimple */}
        <div className="chat-messages h-[300px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessageSimple
              key={message.id}
              message={message.text}
              type={message.type}
              timestamp={message.timestamp}
              onCopy={() => console.log('Copy clicked')}
              onLike={() => console.log('Like clicked')}
            />
          ))}
        </div>

        {/* Simple Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 bg-surface/50 border border-border rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button className="p-3 bg-accent text-white rounded-xl">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIChatMinimal;