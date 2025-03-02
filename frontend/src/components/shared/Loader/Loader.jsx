import React from 'react'
import { LoadingOverlay } from '@mantine/core';
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <LoadingOverlay visible={true} loaderProps={{ children: <div className={styles.loader}></div> }} zIndex={99999}/>
    </div>
  )
}

export default Loader