import { useState } from 'react';

export function useChat() {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    // Implement your chat logic here
    setMessages([...messages, message]);
  };

  return { messages, sendMessage };
}
