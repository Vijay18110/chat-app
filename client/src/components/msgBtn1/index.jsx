import React from 'react'
import styles from './index.module.css';
const MsgBtn1 = ({ msg, m }) => {
    console.log(m)
    return (
        <div className={m.senderId === localStorage.getItem('loggedInUserId') ? styles.btnCont1 : styles.btnCont2}  >
            <div className={m.senderId === localStorage.getItem('loggedInUserId') ? styles.btn2 : styles.btn1}>{msg}

            </div>
            <div className={styles.time}>
                {`${new Date(m.createdAt).getHours()}
 :${new Date(m.
                    createdAt).getMinutes()}
    `}
            </div>
        </div>
    )
}
export default MsgBtn1;