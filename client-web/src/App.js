import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { PrimeReactProvider } from "primereact/api";

//Authenatication
import LoginVerify from "./Components/Auth/LoginVerify";
import Verify from "./Components/Auth/Verify";

//Login Page (Common for All)
import Login from "./Pages/Login";

//ErrorPage
import ErrorPage from "./Pages/ErrorPage";

//All Layout
import AdminLayout from "./Components/Admin/Layout";
import AuthorityLayout from "./Components/Authority/Layout";
import ManagerLayout from "./Components/Manager/Layout";

//Dashbaord
import AdminDashboard from "./Pages/AdminDashboard";
import AuthorityDashboard from "./Pages/AuthorityDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";

//Admin Pages
import AddAuthority from "./Components/Admin/Authority/AddAuthority";
import AddFacility from "./Components/Admin/Facility/AddFacility";
import AddSportsComplex from "./Components/Admin/SportsComplex/AddSportsComplex";
import AdminAllManager from "./Components/Admin/Manager/AllManager";
//Authority Pages
import AddManager from "./Components/Authority/Manager/AddManager";
import AllAuthority from "./Components/Admin/Authority/AllAuthority";
import AllFacility from "./Components/Admin/Facility/AllFacility";
import AllSportsComplex from "./Components/Admin/SportsComplex/AllSportsComplex";
import AllManager from "./Components/Authority/Manager/AllManager";
import AllAuthoritySportsComplex from "./Components/Authority/SportsComplex/AllSportsComplex";
import Profile from "./Components/Authority/Profile/Profile";

// Manager Pages

import AuthorityProfile from "./Components/Manager/Profile";
import AddSupervisor from "./Components/Manager/Supervisor/AddSupervisor";
import AllSupervisor from "./Components/Manager/Supervisor/AllSupervisor";
import AddInstructor from "./Components/Manager/Instructor/AddInstructor";
import AllInstructor from "./Components/Manager/Instructor/AllInstructor";
import SportsComplexDetails from "./Components/Manager/SportsComplexDetails/SportsComplexDetails";
import EditSportsComplexDetails from "./Components/Manager/SportsComplexDetails/EditSportsComplexDetails";
import ComplaintDetails from "./Components/Manager/Complaint/ComplainDetails";
import AuthorityComplaintDataTable from "./Components/Authority/Complaint/ComplaintDetails";
import Athelte from "./Components/Manager/Athelte/Athelte";
import AdminComplaint from "./Components/Admin/Complaint/Complaint";
import Analysis from "./Components/Admin/Analysis/Analysis";
import AuthorityAnalysis from "./Components/Authority/Analysis/Analysis";
import AddComplaint from "./Components/Authority/Complaint/AddComplaint";
import AddComplaintType from "./Components/Admin/Complaint/AddComplaintType";
import ManagerAddComplaint from "./Components/Manager/Complaint/ManagerAddComplaint";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: LoginVerify,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: () => {
      return Verify(5);
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "allauthority",
        element: <AllAuthority />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addauthority",
        element: <AddAuthority />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allmanager",
        element: <AdminAllManager />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allfacility",
        element: <AllFacility />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addfacility",
        element: <AddFacility />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allsportscomplex",
        element: <AllSportsComplex />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addsportscomplex",
        element: <AddSportsComplex />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allcomplaints",
        element: <AdminComplaint />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allanalysis",
        element: <Analysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addcomplianttype",
        element: <AddComplaintType />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/authority",
    element: <AuthorityLayout />,
    loader: () => {
      return Verify(4);
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthorityDashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "analysis",
        element: <AuthorityAnalysis />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addmanager",
        element: <AddManager />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allmanager",
        element: <AllManager />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allsportscomplex",
        element: <AllAuthoritySportsComplex />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allcomplaint",
        element: <AuthorityComplaintDataTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addcomplaint",
        element: <AddComplaint />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    loader: () => {
      return Verify(3);
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ManagerDashboard />,
      },
      {
        path: "profile",
        element: <AuthorityProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "facilitydetails",
        element: <SportsComplexDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "editfacility",
        element: <EditSportsComplexDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allsupervisor",
        element: <AllSupervisor />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addsupervisor",
        element: <AddSupervisor />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allinstructor",
        element: <AllInstructor />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addinstructor",
        element: <AddInstructor />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allcomplaint",
        element: <ComplaintDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "allathelte",
        element: <Athelte />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addcomplaint",
        element: <ManagerAddComplaint />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <PrimeReactProvider>
        <RouterProvider router={routes}></RouterProvider>
      </PrimeReactProvider>
    </ThemeProvider>
  );
};

export default App;
