import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

import { paths } from './utility/constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from "./pages/NotFound/NotFound";



const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});
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
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App;
