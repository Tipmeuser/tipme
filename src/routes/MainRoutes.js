import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { MainLayout } from "../layouts";
import Completion from "../screens/Dashboard/Completion";
import Payment from "../screens/Dashboard/Payment";

const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Navigate to="stripe-payment-dashboard" replace />,
    },
    {
      path: "stripe-payment-dashboard",
      element: <Dashboard />,
    },
    {
      path: "payment",
      element: <Payment/>,
    },
    {
      path: "completion",
      element: <Completion />,
    },
  ],
};

export default MainRoutes;
