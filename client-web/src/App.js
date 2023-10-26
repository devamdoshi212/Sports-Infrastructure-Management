import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/Admin/Layout";
import AdminDashboard from "./Pages/AdminDashboard";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
