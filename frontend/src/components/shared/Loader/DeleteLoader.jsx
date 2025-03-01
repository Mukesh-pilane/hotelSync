import React from 'react'
import { LoadingOverlay } from '@mantine/core';
import styles from './Loader.module.scss'

const DeleteLoader = () => {
    return (
        <LoadingOverlay overlayColor="#efefef" visible={true} loader={<div className={styles.deleteLoader}>Deleting</div>} zIndex={999999}/>
    )
}

export default DeleteLoader