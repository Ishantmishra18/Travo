import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/nav';
import RoomSB from './Components/roomSB';
import RoomPost from './Components/roomPost';
import ChatPage from './Pages/chatPage';
import Login from './Pages/login';
import Register from './Pages/register';
import HomePost from './Pages/postPage';
import { UserProvider } from './Context/userContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <RoomSB />
        <RoomPost />
      </>
    ),
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/post',
    element: (
      <>
        <Navbar />
        <HomePost />
      </>
    ),
  },
]);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
