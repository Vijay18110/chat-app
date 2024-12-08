import React from 'react'
import styles from './index.module.css';
const IconCont = ({ children }) => {
    return (
        <div className={styles.iconCont}>{children}</div>
    )
}

export default IconCont;