import { FaAngleDown, FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import styles from './index.module.css';
import Searchbar from "../../components/searchbar";
import IconCont from "../../components/IconCont";
import ChatUser from "../../components/UserChat";
import Button from "../../components/Button";
import { useGetData } from "../../hooks/getdata";
import Loader from "../../components/loader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Chat = () => {
    const [data, error, loading] = useGetData('http://localhost:5000/api/allusers');
    const [filterdata, setFilterdata] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/login', { replace: true });
        }
        // const data2 = data.filter((it) => it.name !== state);
        setFilterdata(data);
    }, [data]);
    const handleChange = (e) => {
        const d = data.filter((it) => it.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterdata(d);
    }
    const handleClick = async () => {
        axios.post('http://localhost:5000/api/logout', { token: localStorage.getItem('token') }).then((res) => console.log(res)).catch((err) => console.log(err));
        localStorage.removeItem('token');
        Navigate('/login', { replace: true });
    }
    return (
        <div className={styles.chatCont}>
            <div className={styles.header}>
                <div className={styles.username}><span>{localStorage.getItem("username")}</span><span><FaAngleDown /></span></div>
                <div className={styles.SearchbarCont}><Searchbar handleChnage={handleChange} /></div>
                <Button handleClick={handleClick} value="logout" />
                {/* <IconCont><FaRegEdit size={20} color="rgb(168, 162, 162)" /></IconCont> */}
            </div>
            <div className={styles.userlist}>
                <div className={styles.heading}>start chat with?</div>
                <div className={styles.userCont}>
                    {loading ? <Loader /> : filterdata.length > 0 ? filterdata.map((it) => <ChatUser key={it._id} user={it} />) : <div className={styles.noUser}> <span>there is no user for chat</span></div>}
                </div>
            </div>
        </div>
    )
}
export default Chat