import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './Components/Header/header';
import Dashboard from './Components/Dashboard/dashboard';
import Content from './Components/Dashboard/content';
import Project from './Components/pages/project';
import Tranction from './Components/pages/tranction';
import Booking from './Components/pages/booking';
import Withdrawl from './Components/pages/withdrawl';
import WithdrawlHistory from './Components/pages/withdrawlHistory';
import Referral from './Components/pages/referral';
import Bonus from './Components/pages/bonus';
import Bank from './Components/pages/bank';
import Contact from './Components/pages/contact';
import Privacy from './Components/pages/privacy';
import Terms from './Components/pages/terms';
import About from './Components/pages/about';

// App component responsible for routing and rendering different pages
export default function App() {
  // Create a browser router with specified routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { index: true, element: <Content/>},
        {path:"project", element:<Project/>},
        {path:"booking", element:<Booking/>},
        {path:"tranction", element:<Tranction/>},
        {path:"withdrawl", element:<Withdrawl/>},
        {path:"withdrawlHistory", element:<WithdrawlHistory/>},
        {path:"referral", element:<Referral/>},
        {path:"bonus", element:<Bonus/>},
        {path:"bank", element:<Bank/>},
        {path:"contact", element:<Contact/>},
        {path:"privacy", element:<Privacy/>},
        {path:"terms", element:<Terms/>},
        {path:"about", element:<About/>}
      ]
      },
        { path: 'home', element: <Home /> },
        // { path: 'myOrders', element: <Orders /> }
      
    
  ]);

  return (
    <>
      {/* Provide the router to the RouterProvider */}
      <RouterProvider router={router} />
    </>
  );
}
