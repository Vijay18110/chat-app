import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import axios from 'axios'
import Loader from '../components/loader';
import Swal from 'sweetalert2';
const Register = () => {
    const [data, setdata] = useState({});
    const [registering, setRegistering] = useState(false);
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
        email: "",
        password: "",
        confirmPassword: "",
        file: ""

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (handlevalidation()) {
                setRegistering(true);
                const { name, email, password } = user;
                const data = await axios.post('http://localhost:5000/api/register', { name, email, password });
                if (data.data.msg === "Username Already present") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Username Already present!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
                if (data.data.msg === "Email Already present") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email Already present!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
                if (data.data.status) {
                    navigate('/login');
                }
                setRegistering(false);
            }
        } catch (error) {
            console.log(error);

            setRegistering(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
    const handlevalidation = () => {
        const { email, name, confirmPassword, password } = user;
        if ([password, confirmPassword].some((it) => it === "")) {
            toast.error("fill password field", toastOption);
            return false;
        }
        else if (password !== confirmPassword) {
            toast.error("password and confirm password should be same", toastOption);
            return false;
        }
        else if (name.length <= 3) {
            toast.error("username must be greater than 3 character", toastOption);
            return false;
        }
        else return true;
    }
    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }
    const handlechange2 = (e) => {
        setuser({ ...user, [e.target.name]: e.target.files[0] });
    }
    return (
        <>
            <div className='formContainer'>
                {registering ? <Loader /> : <form className='' onSubmit={(e) => handleSubmit(e)}>
                    <div className="imgContrl">
                        <img src="vite.svg" alt="logo" className='logo' />
                    </div>
                    <h1>snappy</h1>
                    <input type="text" placeholder='Username' name='name' onChange={(e) => handlechange(e)} />
                    <input type="email" placeholder='Email' name='email' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handlechange(e)} />
                    <input type="password" placeholder='confirmPassword' name='confirmPassword' onChange={(e) => handlechange(e)} />
                    <input type="file" placeholder='file' name='file' onChange={(e) => handlechange2(e)} />
                    <button type='submit'> create-user</button>
                    <span> Already have an account ? <Link to='/login'>Login</Link></span>
                </form>}
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}
export default Register