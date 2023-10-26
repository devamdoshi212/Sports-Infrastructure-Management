import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
