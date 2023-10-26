import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/Admin/Layout";
import AdminDashboard from "./Pages/AdminDashboard";
import AddAuthority from "./Components/AddAuthority";
import { ThemeProvider } from "@material-tailwind/react";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "addauthority",
        element: <AddAuthority />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  );
};

export default App;
