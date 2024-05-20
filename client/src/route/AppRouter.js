import App from '../App';
import ProtectRoute from '../components/ProtectRoute';
import AuthContext from '../context/AuthContext';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import { Toaster } from "react-hot-toast"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [{
      path: "/",
      element: <ProtectRoute path={"/login"}><Home /></ProtectRoute>
    },
    {
      path: "/login",
      element: <ProtectRoute path={"/login"}><Login /></ProtectRoute>
    },
    {
      path: "/signup",
      element: <ProtectRoute path={"/signup"}><SignUp /></ProtectRoute>
    }
    ],
  },
]);

function AppRouter() {

  return <>
    <AuthContext>
        <RouterProvider router={router} />
        <Toaster />
    </AuthContext>
  </>
}

export default AppRouter
