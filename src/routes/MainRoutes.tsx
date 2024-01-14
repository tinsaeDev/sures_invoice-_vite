import App from "../App";

import InvoiceForm from "../pages/invoice/InvoiceForm";
import DashboadPage from "../pages/invoice/Dashboard";
import SerttinsPage from "../pages/invoice/Settings";
import ReportsPage from "../pages/invoice/Reports";

import { RouteObject } from "react-router-dom";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboadPage />,
      },

      {
        path: "/settings",
        element: <SerttinsPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },

      {
        path: "/invoice",
        element: <InvoiceForm />,
      },
    ],
  },
] as RouteObject[];
