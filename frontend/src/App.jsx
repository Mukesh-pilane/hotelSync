// import '@mantine/core/styles.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { paths } from './utility/constants';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from "./pages/NotFound/NotFound";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";
import { permissions } from "./utility/permission";
import { useAuthStore } from "./store/client/authStore";
import DeleteModal from "./components/shared/Modal/DeleteModal";
import CustomModal from "./components/shared/Modal/CustomModal";
import MessageModal from "./components/shared/Modal/MessageModal";



function App() {
  const [queryClientstate] = useState(() => queryClient);
  const { userData, isAuthenticated } = useAuthStore((state) => state);

  const router = createBrowserRouter([
    ...Object.values(paths?.publicRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PublicRoute component={e?.element} />
      }
    }),
    ...Object.values(paths?.privateRoutes)?.map((e) => {
      if (userData && permissions[userData?.role]?.includes(e.permissionKey)) {
        return {}
      }
      return {
        path: e?.path,
        element: <PrivateRoute component={e?.element} />,
        children: [
          ...Object.values(e?.children)?.map((ele) => {
            if (userData && !permissions[userData?.role]?.includes(ele.permissionKey)) {
              return {}
            }
            return {
              path: ele?.path,
              element: <PrivateRoute component={ele?.element} path={ele?.path} />,
            }
          })
        ]
      }
    }),
    {
      path: "/",
      element: <Navigate to="/transaction" />
    },
    {
      path: "/unauthorized",
      element: <div>no access !!</div>,
    },
    {
      path: "*",
      element: isAuthenticated ? <NotFound /> : <Navigate to={"/login"} />
    }
  ]);

  return (
    <QueryClientProvider client={queryClientstate}>
      <MantineProvider
        // withGlobalStyles withNormalizeCSS
        theme={{
          fontFamily: 'Open Sans, sans-serif',
          primaryColor: 'indigo',
          colors: {
            indigo: ['#c6c4fb', '#c6c4fb', '#e8e7fd', '#e8e7fd', '#2f28f0', '#2f28f0','#5e58f4'],
          }
        }}>
        <ModalsProvider  modals={{ "delete": DeleteModal, "custom": CustomModal, "message": MessageModal }} labels={{ confirm: 'Submit' }}>
          <Notifications position="top-right" zIndex={2077} />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App;
