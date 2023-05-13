import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path:"/auth",
      element:<MainLayout/>,
      children:[
        {element:<Loginpage/>,path:"login"},
        {element:<Registerpage/>,path:"register"},
        {element:<ResetPasswordpage/>,path:"reset-password"},
        {element:<NewPasswordpage/>,path:"new-password"}
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        {path:"settings",element:<Settings/>},
        
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
const Loginpage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const Registerpage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);
const ResetPasswordpage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);
const NewPasswordpage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));