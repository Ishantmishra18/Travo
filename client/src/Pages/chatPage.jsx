import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useUser } from '../Context/userContext';
import socket from '../utils/socket';
import Loader from '../Components/loader';

const ChatPage = () => {
  const { bidID } = useParams();
  const [chats, setChats] = useState([]);
  const [bid, setBid] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const bottomRef = useRef(null); // 👈 Used for auto-scroll

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.get(`/bid/${bidID}/messages`);
        setChats(res.data.messages);
        setBid(res.data.bid);
        setChatPartner(res.data.chatPartner);
      } catch (error) {
        console.log('Error fetching chat:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChat();
  }, [bidID]);

  useEffect(() => {
    if (!bidID) return;

    socket.emit('joinRoom', bidID);

    socket.on('receiveMessage', (msg) => {
      setChats((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [bidID]);

  // Scroll to bottom whenever chat changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await api.post(`/bid/${bidID}/send`, { message });
      setMessage('');
    } catch (error) {
      console.error('Send error:', error);
    }
  };

  if (loading || !user || !bid || !chatPartner)
    return (
      <div className="text-center p-10">
        <Loader />
      </div>
    );

  const post = bid.postId;

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white overflow-hidden">

      {/* LEFT PANEL */}
      <div className="w-full md:w-[30vw] bg-gray-100 p-6 sticky top-0 border-b-2 border-neutral-700 md:border-none flex-shrink-0 h-auto md:h-screen flex flex-col justify-between">
        <img src={post.cover || '/default-post.jpg'} alt="post" className="w-full aspect-video rounded-md object-cover" />
        <div className="space-y-4 md:space-y-6">
          <div>
            <h1 className="text-base md:text-2xl font-semibold truncate">{post.title}</h1>
            <p className="text-xs md:text-sm text-gray-500">
              Originally: <span className="text-sm md:text-lg text-black font-medium">₹{post.price}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={chatPartner.cover || '/default-avatar.png'}
              alt="user"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm md:text-lg font-semibold">{chatPartner.username}</p>
              <p className="text-xs text-gray-500">Chat Partner</p>
            </div>
          </div>
        </div>

        {/* Offer Summary */}
        <div className="text-xs md:text-sm md:block hidden border-gray-300 border-t pt-3 mt-3 md:pt-4 md:mt-4 space-y-1 md:space-y-2">
          <p className="font-semibold">Negotiation Summary</p>
          <p>
            Latest Offer: <span className="font-bold text-lg md:text-xl text-black">₹{bid.latestOfferAmount}</span>
          </p>
          <p>
            Difference: <span className="text-red-500 font-medium text-lg md:text-xl">₹{Math.abs(post.price - bid.latestOfferAmount)}</span>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-[70vw] flex flex-col h-screen">

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4 space-y-3">
          {chats.map((val, index) => (
            <div
              key={index}
              className={`w-full flex ${user._id !== val.sender ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                  user._id !== val.sender ? 'bg-gray-200' : 'bg-neutral-500 text-white'
                }`}
              >
                <p>{val.message}</p>
                <p className={`text-xs mt-1 ${user._id !== val.sender ? 'text-gray-500' : 'text-gray-300'}`}>
                  {new Date(val.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} /> {/* 👈 SCROLL TARGET */}
        </div>

        {/* Sticky Input */}
        {bid.status !== 'accepted' && (
          <div className=" p-4 g-white">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full px-4 py-4 pr-20 bg-gray-200 focus:outline-none rounded-2xl border-2 border-neutral-700"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatPage;
