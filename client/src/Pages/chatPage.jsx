import { useParams } from 'react-router-dom';
import api from '../utils/api';
import React, { useEffect, useState } from 'react';
import { useUser } from '../Context/userContext';

const ChatPage = () => {
  const { bidID } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await api.get(`/bid/${bidID}/messages`);
        setChats(response.data);
      } catch (error) {
        console.log('Error while fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChat();
  }, [bidID]);

  if (loading || !user) return <>Loading...</>;

  return (
    <div className="flex flex-col w-[80vw] h-auto space-y-2">
      {chats.map((val, index) => (
        <div key={index} className={`w-full flex ${user._id !== val.sender ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-[60%] px-4 py-2 rounded-2xl ${user._id !== val.sender ? 'bg-amber-300' : 'bg-amber-500'}`}>
            <h1 className="font-semibold">{val.message}</h1>
            {val.offerAmount && <p className="text-sm text-gray-700">₹{val.offerAmount}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
