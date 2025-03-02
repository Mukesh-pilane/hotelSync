import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styles from "./HomeLayout.module.scss"
import SideBar from '../../shared/Sidebar/Sidebar'
import Loader from '../../shared/Loader/Loader'
const HomeLayout = () => {
    let location = useLocation();
    
    return (
        <div className={styles?.main_container}>
            <SideBar />
            <div className={styles?.rightSideContainer}>
                <div className={styles?.outlet_content}>
                    <Suspense fallback={<Loader />} key={location.key}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default HomeLayout