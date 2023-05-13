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
        {element:<NewPasswordpage/>,path:"new-password"},
        {element:<Verifypage/> , path:"verify"}
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        {path:"settings",element:<Settings/>},
        {path:"group",element:<GroupPage/>},
        {path:"call",element:<CallPage/>},
        {path:"profile",element:<Profilepage/>},
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
const Profilepage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
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
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const Verifypage = Loadable(lazy(() => import("../pages/auth/Verify")))