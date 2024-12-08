import React from 'react'
import styles from './index.module.css';
import { FaSearch } from 'react-icons/fa';
const Searchbar = ({ handleChnage }) => {
    return (
        <div className={styles.searchbarCont}>
            {/* <span className={styles.searchIcon}><FaSearch /></span> */}
            <input onChange={(e) => handleChnage(e)} className={styles.inputSearch} type="text" placeholder='Search User...' />
        </div>
    )
}

export default Searchbar