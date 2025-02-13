import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { paths } from './utility/constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from "./pages/NotFound/NotFound";

function App() {

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
    <>
      <MantineProvider >
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App;
