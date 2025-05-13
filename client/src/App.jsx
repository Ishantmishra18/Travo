import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/nav';
import RoomSB from './Components/roomSB';
import RoomPost from './Components/roomPost';
import ChatPage from './Pages/chatPage';
import Login from './Pages/login';
import Register from './Pages/register';
import HomePost from './Pages/postPage';
import ProfilePage from './Pages/profilePage';
import { UserProvider } from './Context/userContext';
import { PostProvider } from './Context/postContext';
import AddPost from './Pages/addPost';
import ListingPage from './Pages/listingPage';
import Bookmark from './Pages/bookmark';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ListingPage />
       
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
    path: '/listing/:postID',
    element: (
      <>
        <Navbar />
        <HomePost />
      </>
    ),
  },
  {
    path:'/profile',
    element:<ProfilePage/>
  },{
    path:'/profile/list',
    element:<AddPost/>
  },{
    path:'/profile/bookmark',
    element:<Bookmark/>
  }
]);

const App = () => {
  return (
    <UserProvider>
      <PostProvider>
      <RouterProvider router={router} />
      </PostProvider>
    </UserProvider>
  );
};

export default App;
