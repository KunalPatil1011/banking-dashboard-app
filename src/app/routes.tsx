import { Navigate, createBrowserRouter, } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../features/auth/components/LoginPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import FilesPage from "../features/files/FilesPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import ReportsPage from "../features/reports/ReportsPage";
import SettingsPage from "../features/settings/SettingsPage";
export const router =
    createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            element: (
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/dashboard",
                    element: <DashboardPage />,
                },
                {
                    path: "/files",
                    element: <FilesPage />,
                },
                {
                    path: "/reports",
                    element: <ReportsPage />,
                },
                {
                    path: "/settings",
                    element: <SettingsPage />,
                },
            ],
        },
        {
            path: "/",
            element: (
                <Navigate
                    to="/dashboard"
                    replace
                />
            ),
        },
        {
            path: "*",
            element: (
                <Navigate
                    to="/dashboard"
                    replace
                />
            ),
        },
    ]);