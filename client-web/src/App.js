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
import AddAuthority from "./Components/Admin/AddAuthority";
import AddSports from "./Components/Admin/AddSport";
import AddSportsComplex from "./Components/Admin/AddSportsComplex";

//Authority Pages
import AddManager from "./Components/Authority/AddManager";
import AllAuthority from "./Components/Admin/AllAuthority";

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
        path: "addfacility",
        element: <AddSports />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addsportscomplex",
        element: <AddSportsComplex />,
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
        path: "addmanager",
        element: <AddManager />,
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
