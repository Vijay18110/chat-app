// import img1 from '../../assets/react.svg';
import { FaRegUserCircle } from "react-icons/fa";
import React from "react";
import styles from "./index.module.css";
import img from '../../assets/vijay3.png.jpg'
import styled from 'styled-components';
import Button from "../Button";
import { useNavigate } from "react-router-dom";
const ChatUser = ({ user }) => {
  const Navigate = useNavigate();
  const handleClick = (u) => {
    Navigate('/chat', { state: JSON.stringify(user), replace: true });
  }
  return (
    <StyledWrapper>
      <div className="card">
        <div className={styles.content}>
          <div className={styles.imgCont} style={{ backgroundImage: `url(${img})` }}>
            <span className={styles.online}></span>
          </div>
          <span>{user.name}</span>
          <Button handleClick={() => handleClick(user)} value="chat" />
        </div>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .card {
    width:250px;
    height: 254px;
margin:10px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    background: #07182E;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
    overflow: hidden;
padding:1rem;
    border-radius: 20px;
transition:all .3s linear;
&:hover{
transform:scale(1.1);
}
  }

  .card h2 {
    z-index: 1;
    color: white;
    font-size: 2em;
  }

  .card::before {
    content: '';
    position: absolute;
    width: 100px;
    background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: '';
    position: absolute;
    background: white;
    inset: 5px;
    border-radius: 15px;
  }
  /* .card:hover:before {
    background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
    animation: rotBGimg 3.5s linear infinite;
  } */`;

export default ChatUser;

