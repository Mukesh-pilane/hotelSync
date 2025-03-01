import { lazy } from "react"
const HomeLayout = lazy(() => import("../components/layouts/Homelayout/HomeLayout"))
const Login = lazy(() => import("../pages/Login/Login"))
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"))
const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"))
const Customer = lazy(() => import("../pages/Customer/Customer"))
const Hotel = lazy(() => import("../pages/Hotel/Hotel"))
const Transaction = lazy(() => import("../pages/Transaction/Transaction"))
const TokenRange = lazy(() => import("../pages/TokenRange/TokenRange"))
const HotelSetting = lazy(() => import("../pages/HotelSetting/HotelSetting"))

import {
    // IconAdjustments,
    IconUsersGroup,
    IconBuilding,
    IconReceiptRupee,
    IconAdjustments,
  } from '@tabler/icons-react';

export const paths = {
    publicRoutes: {
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
                    permissionKey:"dashboard"
                },
                users:{
                    path: "/customer",
                    element: Customer, 
                    permissionKey:"customer"
                },
                Hotel:{
                    path: "/hotels",
                    element: Hotel, 
                    permissionKey:"hotel"
                },
                Transaction:{
                    path: "/transaction",
                    element: Transaction, 
                    permissionKey:"transaction"
                },
                TokenRange:{
                    path: "/tokenRange",
                    element: TokenRange, 
                    permissionKey:"settings"
                },
                HotelSetting:{
                    path: "/hotelSetting",
                    element: HotelSetting, 
                    permissionKey:"hotelSetting"
                },
            }
        }
    }
}


export const sideBarMenu = [
    { label: 'Customer', icon: IconUsersGroup, link: '/customer', permissionKey:"customer" },
    { label: 'Hotels', icon: IconBuilding, link: '/hotels', permissionKey:"hotel"},
    { label: 'Transaction', icon: IconReceiptRupee, link: '/transaction', permissionKey:"transaction"},
      {
        label: 'Settings',
        permissionKey:"settings",
        icon: IconAdjustments,
        links: [
          { label: 'Token', link: '/tokenRange' },
          { label: 'Hotel Setting', link: '/hotelSetting', permissionKey:"hotelSetting" },
        ],
      },
]