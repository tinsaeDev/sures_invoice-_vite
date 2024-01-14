import React from "react";
import ReactDOM from "react-dom/client";

// Redux

import { store } from "./store";
import { Provider } from "react-redux";

import mainRoutes from "./routes/MainRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  ...mainRoutes,
  // ...AuthRoutes,
  ...[
    // {
    //   path: "*",
    //   element: <NotFoundPage />,
    // },
    //
  ],
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
