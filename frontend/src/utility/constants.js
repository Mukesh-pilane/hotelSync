import { lazy } from "react"
const HomeLayout = lazy(() => import("../components/layouts/Homelayout/HomeLayout"))
const Login = lazy(() => import("../pages/Login/Login"))
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"))
const Home = lazy(() => import("../pages/Home/Home"))
const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"))
const Users = lazy(() => import("../pages/Users/Users"))
const Hotel = lazy(() => import("../pages/Hotel/Hotel"))


export const paths = {
    publicRoutes: {
        home: {
            path: "/home",
            element: Home,
        },
        login: {
            path: "/login",
            element: Login
        },
        forgot: {
            path: "/forgotpassword",
            element: ForgotPassword
        },
    },
    privateRoutes: {
        home: {
            path: "/",
            element: HomeLayout,
            children: {
                dashBoard: {
                    path: "/dashboard",
                    element: DashBoard,
                },
                users:{
                    path: "/customer",
                    element: Users, 
                },
                Hotel:{
                    path: "/hotels",
                    element: Hotel, 
                },
            }
        }
    }
}