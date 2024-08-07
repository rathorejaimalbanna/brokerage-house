import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from './Components/Header/header';
import Dashboard from "./Components/Dashboard/dashboard";
import Content from "./Components/Dashboard/content";
import Project from "./Components/pages/project";
import Booking from "./Components/pages/booking";
import Withdrawl from "./Components/pages/withdrawl";
import Referral from "./Components/pages/referral";
import Bonus from "./Components/pages/bonus";
import Bank from "./Components/pages/bank";
import Contact from "./Components/pages/contact";
import Privacy from "./Components/pages/privacy";
import Terms from "./Components/pages/terms";
import About from "./Components/pages/about";
import Admin from "./Components/Admin/admin";
import AdminContent from "./Components/Admin/adminContent";
import ResetPas from "./Components/Home/resetPas";
import ProjectDetails from "./Components/pages/projectDetails";
import AddProject from "./Components/Admin/manageProject";
import Kyc from "./Components/Admin/kyc";
import UserAcounts from "./Components/Admin/userAcounts";
import Prospects from "./Components/Admin/prospect";
import Tranctions from "./Components/Admin/tranction";
import NewProject from "./Components/Admin/newProject";
import EditProject from "./Components/Admin/editProject";
import AddBank from "./Components/pages/addBank";
import BookingRequest from "./Components/Admin/bookingRequest";
import BookingHistory from "./Components/Admin/bookingHistory";
import WithdrawlRequest from "./Components/Admin/withdrawlRequests";
import Transaction from "./Components/pages/withdrawlHistory";
import ProjectRequest from "./Components/Admin/projectRequest";
import SecondAuth from "./Components/pages/secondAuth";
import VillaProject from "./Components/Dashboard/villaProject";
import PlotProject from "./Components/Dashboard/plotProject";
import ShopProject from "./Components/Dashboard/shopProject";
import FlatProject from "./Components/Dashboard/flatProject";
import FarmProject from "./Components/Dashboard/farmProject";
import ManageUserProject from "./Components/Admin/manageUserProject";
import EditUserProject from "./Components/Admin/editUserProject";
import UserProjectDetails from "./Components/pages/userProjectDetails";
import Profile from "./Components/pages/Profile";

// App component responsible for routing and rendering different pages
export default function App() {
  // Create a browser router with specified routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { index: true, element: <Content /> },
        { path: "project", element: <Project /> },
        { path: "project/:id", element: <ProjectDetails /> },
        { path: "userProjectDetails/:id", element: <UserProjectDetails /> },
        { path: "booking", element: <Booking /> },
        { path: "transaction", element: <Transaction /> },
        { path: "withdrawl", element: <Withdrawl /> },
        { path: "referral", element: <Referral /> },
        { path: "bonus", element: <Bonus /> },
        { path: "bank", element: <Bank /> },
        { path: "contact", element: <Contact /> },
        { path: "privacy", element: <Privacy /> },
        { path: "terms", element: <Terms /> },
        { path: "about", element: <About /> },
        { path: "addBank", element: <AddBank /> },
        { path: "villaProject", element: <VillaProject /> },
        { path: "farmProject", element: <FarmProject /> },
        { path: "flatProject", element: <FlatProject /> },
        { path: "plotProject", element: <PlotProject /> },
        { path: "shopProject", element: <ShopProject /> },
        { path: "myProfile", element: <Profile /> },
      ],
    },
    { path: "home", element: <Home /> },
    { path: "home/:prospect", element: <Home prospect={"prospect"} /> },
    { path: "reset", element: <ResetPas /> },
    { path: "secondAuth/:email", element: <SecondAuth /> },
    {
      path: "admin",
      element: <Admin />,
      children: [
        { index: true, element: <AdminContent /> },
        { path: "addProject", element: <AddProject /> },
        { path: "manageUserProject", element: <ManageUserProject /> },
        { path: "kyc", element: <Kyc /> },
        { path: "userAccounts", element: <UserAcounts /> },
        { path: "prospect", element: <Prospects /> },
        { path: "addProject/:id", element: <EditProject /> },
        { path: "manageUserProject/:id", element: <EditUserProject /> },
        { path: "tranction", element: <Tranctions /> },
        { path: "newProject", element: <NewProject /> },
        { path: "bookingRequest", element: <BookingRequest /> },
        { path: "bookingHistory", element: <BookingHistory /> },
        { path: "withdrawlRequest", element: <WithdrawlRequest /> },
        { path: "projectRequest", element: <ProjectRequest /> },
      ],
    },
  ]);

  return (
    <>
      {/* Provide the router to the RouterProvider */}
      <RouterProvider router={router} />
    </>
  );
}
