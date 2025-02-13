import React from 'react';
import styles from './PublicLayout.module.scss';

const PublicLayout = ({ component: Component }) => {
    return (
        <div className={styles.publicLayout}>
            <Component />
        </div>
    );
};

export default PublicLayout;
