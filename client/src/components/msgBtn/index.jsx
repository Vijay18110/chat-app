import React from 'react'
import styles from './index.module.css';
const MsgBtn = ({ msg }) => {
    return (
        <span className={styles.btn1}>{msg}</span>
    )
}

export default MsgBtn;