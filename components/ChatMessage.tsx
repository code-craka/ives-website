import React from 'react';

interface Message {
  id: string;
  content: string;
  // Add other properties as needed
}

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="chat-message">
      <p>{message.content}</p>
    </div>
  );
}
