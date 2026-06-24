import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/main-layout";
import Home from "../pages/home/home";
import Unlimited from "../pages/unlimited/unlimited";
import AllCharacters from "../pages/all-characters/all-characters";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/unlimited",
                element: <Unlimited />
            },
            {
                path: "/all-characters",
                element: <AllCharacters />
            }
        ]
    }
])