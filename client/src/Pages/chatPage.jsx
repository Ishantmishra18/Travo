import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useUser } from '../Context/userContext';

const ChatPage = () => {
  const { bidID } = useParams();
  const [chats, setChats] = useState([]);
  const [bid, setBid] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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



  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline in textarea
      handleSend();
    }
  };


  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const res = await api.post(`/bid/${bidID}/send`, { message });
      setChats(prev => [...prev, res.data]);
      setMessage('');
    } catch (error) {
      console.error('Send error:', error);
    }
  };


  if (loading || !user || !bid || !chatPartner)
    return <div className="text-center p-10">Loading...</div>;

  const post = bid.postId;

  return (
    <div className="flex h-screen w-screen bg-white">

      {/* LEFT PANEL */}
      <div className="w-[30vw] bg-gray-100 p-6 sticky top-0 h-screen flex flex-col justify-between">
        <div className="space-y-6">
          <img src={post.cover || '/default-post.jpg'} alt="post" className="w-full aspect-video rounded-md object-cover" />
          <div>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-sm text-gray-500">Originally: <span className="text-lg text-black font-medium">₹{post.price}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <img src={chatPartner.cover || '/default-avatar.png'} alt="user" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-lg">{chatPartner.username}</p>
              <p className="text-xs text-gray-500">Chat Partner</p>
            </div>
          </div>

          <Link
            to={`/listing/${post._id}`}
            className="inline-block mt-4 bg-black text-white text-center py-2 px-4 rounded-full hover:bg-gray-800 transition"
          >
            View Post
          </Link>
        </div>

        {/* Bottom - Offer Summary */}
        <div className="text-sm border-gray-400 border-t-2 pt-4 mt-4 space-y-2">
          <p className="font-semibold">Negotiation Summary</p>
          <p>
            Latest Offer: <span className="font-bold text-xl text-black">₹{bid.latestOfferAmount}</span>
          </p>
          <p>
            Difference: <span className="text-red-500 font-medium text-xl">₹{Math.abs(post.price - bid.latestOfferAmount)}</span>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[70vw] flex flex-col justify-between h-screen">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {chats.map((val, index) => (
            <div key={index} className={`w-full flex ${user._id !== val.sender ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[60%] px-4 flex flex-col items-start gap-3 py-2 rounded-2xl shadow-sm ${
                user._id !== val.sender ? 'bg-gray-200' : 'bg-neutral-500 text-white'
              }`}>
                <p className="">{val.message}</p>
                {val.offerAmount!=0 && (
                  <p className="text-sm mt-1 px-4 py-1 bg-black rounded-full text-white">Offer: ₹{val.offerAmount}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input & Options */}
        {bid.status !== 'accepted' && (
          <div className="sticky bottom-0  p-4">
            <div className="flex flex-col items-end gap-3">
              <div className="enterMsg w-full rounded-xl relative">
                  <div className="send px-6 py-2 bg-black text-white absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 rounded-2xl" onClick={handleSend}>Send</div>
                    <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full px-4 h-full py-4 bg-gray-200 focus:outline-none rounded-2xl focus:ring-gray-300"
              />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
