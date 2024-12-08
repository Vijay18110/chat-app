import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import axios from 'axios'
import Swal from 'sweetalert2';
const Login = () => {
    const [data, setdata] = useState({});
    const navigate = useNavigate();
    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [user, setuser] = useState({
        name: "",
        password: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handlevalidation()) {
            const { name, password } = user;
            const config = { url: 'http://localhost:5000/api/login', method: 'POST', data: { name, password } }
            const res = await axios(config);
            if (!res.data.status) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please enter valid username and password!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            else {
                localStorage.setItem("loggedInUserId", res.data.validUser._id);
                localStorage.setItem("token", res.data.accesstoken);
                localStorage.setItem("username", res.data.validUser.name);
                navigate('/');
            }
        }
    }
    const handlevalidation = () => {
        const { name, password } = user;
        if (password === "") {
            toast.error("username and password is required", toastOption);
            return false;
        }
        else if (name === "") {
            toast.error("username and password is required", toastOption);
            return false;
        }
        else return true;
    }
    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className='formContainer'>
                <form className='' onSubmit={(e) => handleSubmit(e)}>
                    <div className='imgContrl'>
                        <img src="vite.svg" alt="logo" className='logo' />
                    </div>
                    <h1>snappy</h1>
                    <input type="text" placeholder='Username' name='name' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handlechange(e)} />
                    <button type='submit'> create-user</button>
                    <span> Don't have an account ? <Link to='/register'>register</Link></span>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}
export default Login;