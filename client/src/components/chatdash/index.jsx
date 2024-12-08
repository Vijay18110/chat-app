import React, { useEffect, useState } from 'react'
import styles from './index.module.css';
import { FaAlignLeft, FaArrowAltCircleLeft, FaPhone, FaVideo } from 'react-icons/fa';
import Button from './sendbtn';
import { useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/vijay3.png.jpg'
import MsgBtn from '../msgBtn';
import MsgBtn1 from '../msgBtn1';
import { messages } from '../../data/msgdata';
import { v4 as id } from 'uuid';
import axios from 'axios';
import Swal from 'sweetalert2';
import useGetMessages from "../../hooks/getmessages.js";
const ChatBoard = () => {
    const Navigate = useNavigate();
    const { state } = useLocation();
    const user = JSON.parse(state);
    const [allmsg, setAllmsg] = useState([]);
    const [lislenclick, setlc] = useState(true);
    const [allMsg] = useGetMessages(user);
    useEffect(() => {
        setAllmsg(allMsg)
    }, [lislenclick, allMsg]);
    const [msg, setMsg] = useState("");
    const handleChange = (e) => {
        setMsg(e.target.value);
    }
    const handleClick = async () => {
        const obj = {
            msg: msg, token: localStorage.getItem('token')
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/send/${user._id}`, obj);
            setlc(!lislenclick);
            messages.push(obj);
            setMsg("");
        } catch (error) {
            if (error.message === "Network Error") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "something went wrong please check your internet!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            console.log(error);
        }
    }
    const onClickGotoUserDash = () => {
        Navigate('/');
    }
    return (
        <div className={styles.chatCont}>
            <div className={styles.header}>
                <div className={styles.userimg}>
                    <span onClick={onClickGotoUserDash}> <FaArrowAltCircleLeft className={styles.arrow} /></span>
                    <div className={styles.imgCont} style={{ backgroundImage: `url(${img})` }}>
                    </div>
                    <div className={styles.username}>
                        <span>{user.name}</span>
                        <span>online</span>
                    </div>
                </div>
                <div className={styles.iconCont}>
                    <span><FaPhone size={30} /></span>
                    <span><FaVideo size={30} /></span>
                </div>
            </div>
            <div className={styles.chat}>
                <div className={styles.msgshow2}>
                    {allmsg.length > 0 ? allmsg.map((msg, index) => <MsgBtn1 key={index} msg={msg.message} m={msg} />) : <div className={styles.nomsg}>say hii to start conversation </div>}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.inputCont}>
                    <input value={msg} onChange={(e) => handleChange(e)} type="text" placeholder='type your message.....' />
                    <Button length={msg.length > 0} handleClick={handleClick} />
                </div>
            </div>
        </div>
    )
}
export default ChatBoard;