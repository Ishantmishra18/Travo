import React, { useState, useEffect } from 'react';


const ChatBox = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  return (
    <div className="w-full max-w-xl bg-white shadow-md rounded p-4 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.username === username ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded px-4 py-2 ${
                msg.username === username
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <span className="text-sm font-semibold block">
                {msg.username}
              </span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded p-2 mr-2"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
