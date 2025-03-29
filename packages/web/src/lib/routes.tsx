import React from "react"
import DashboardPage from "../pages/dashboardPages/Dashboard"
import Discover from "@/pages/dashboardPages/Discover"

interface Routes{
    path: string
    element: React.ReactNode
}

export const dashboardRoutes: Routes[] = [
    {
        path: "/dashboard",
        element: <DashboardPage />,
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
]
