// import '@mantine/core/styles.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MantineProvider } from '@mantine/core';

import { paths } from './utility/constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from "./pages/NotFound/NotFound";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";
import { useState } from "react";



function App() {
  const [queryClientstate] = useState(() => queryClient); 

  const router = createBrowserRouter([
    ...Object.values(paths?.publicRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PublicRoute component={e?.element} />
      }
    }),
    ...Object.values(paths?.privateRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PrivateRoute component={e?.element} />,
        children: [
          ...Object.values(e?.children)?.map((ele) => {
            return {
              path: ele?.path,
              element: <PrivateRoute component={ele?.element} path={ele?.path} />,
            }
          })
        ]
      }
    }),
    {
      path: "/unauthorized",
      element: <div>no access !!</div>,
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <QueryClientProvider client={queryClientstate}>
      <MantineProvider
        withGlobalStyles withNormalizeCSS
        theme={{
          fontFamily: 'Open Sans, sans-serif',
          primaryColor: 'yellow',
        }}>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App;
