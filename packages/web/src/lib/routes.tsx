import TradeDashboard from "@/pages/dashboardPages/TradeDashboard";
import TradeDashboard_Event from "@/pages/dashboardPages/TradeDashboard_Event";
import React from "react";
import DashboardPage from "../pages/dashboardPages/Dashboard";
import Discover from "@/pages/dashboardPages/Discover"

interface Routes {
  path: string;
  element: React.ReactNode;
}

export const dashboardRoutes: Routes[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/trade",
    element: <TradeDashboard />,
  },
  {
    path: "/dashboard/trade/event",
    element: <TradeDashboard_Event />,
  },

    {
        path: "/discover",
        element: <Discover />,
    },
  // Add more routes here
  // Example:
  // {
  //     path: "/dashboard/settings",
  //     element: <DashboardSettings />,
  // },
];
