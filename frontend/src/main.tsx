import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './services/i18.ts'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </StrictMode>
);
