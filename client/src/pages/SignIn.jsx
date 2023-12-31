import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../assets/image/Logo.png";
import Google from '../components/Google';
import Swal from 'sweetalert2';

function SignIn() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [user_email, setUser_email] = useState("");
    const [user_password, setUser_password] = useState("");
    const [showCheckEmail, setShowCheckEmail] = useState(false);
    const [checkEmail, setCheckEmail] = useState("");
    const [showCheckPIN, setShowCheckPIN] = useState(false);
    const [checkPIN, setCheckPIN] = useState("");
    const [showNewPass, setShowNewPass] = useState(false);
    const [newPass, setNewPass] = useState("");

    const themeValue = {
        normal: "black",
        error: "red-500",
        success: "green-500"
    };

    const [massageWarning, setMassageWarning] = useState({
        user_email: '',
        user_password: '',
        one_of_them_is_Invalid: '',
        check_email: '',
        user_PIN: '',
        newPass: '',
        confirmPassword: ''
    });

    const [inputTheme, setInputTheme] = useState({
        user_email: themeValue.normal,
        user_password: themeValue.normal,
        one_of_them_are_Invalid: themeValue.normal,
        check_email: themeValue.normal,
        PIN: themeValue.normal,
        newPass: themeValue.normal,
        confirmPassword: themeValue.normal
    });

    const [checkInput, setCheckInput] = useState({
        user_email: false,
        user_password: false,
        check_email: false,
        PIN: false,
        newPass: false,
        confirmPassword: false
    });

    function handleEmail(event) {
        const patternEmail = /^[A-z0-9]+([.-][A-z0-9]+)*@[A-z0-9]+\.[A-z]{2,5}$/;
        const user_email = event.target.value;
        if (user_email === '') {
            setInputTheme({ ...inputTheme, user_email: themeValue.error });
            setMassageWarning({ ...massageWarning, user_email: "This fild must not be empty" });
        }
        else if (!patternEmail.test(user_email)) {
            setInputTheme({ ...inputTheme, user_email: themeValue.error });
            setMassageWarning({ ...massageWarning, user_email: "Invalid email" });
        }
        else {
            setMassageWarning({ ...massageWarning, user_email: '' });
            setInputTheme({ ...inputTheme, user_email: themeValue.success });
            setUser_email(user_email);
            setCheckInput({ ...checkInput, user_email: true });
        }
    }

    function handlePassword(event) {
        // more than 8 characters, with at least 1 number, uppercase, and special characters.
        const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const user_password = event.target.value;
        if (user_password === '') {
            setInputTheme({ ...inputTheme, user_password: themeValue.error });
            setMassageWarning({ ...massageWarning, user_password: "This fild must not be empty" });
        }
        else if (!patternPassword.test(user_password)) {
            setInputTheme({ ...inputTheme, user_password: themeValue.error });
            setMassageWarning({ ...massageWarning, user_password: "Please enter a password that is at least 8 characters long and contains one uppercase letter, one number, and one special character" })
        }
        else {
            setMassageWarning({ ...massageWarning, user_password: '' });
            setInputTheme({ ...inputTheme, user_password: themeValue.success });
            setUser_password(user_password);
            setCheckInput({ ...checkInput, user_password: true });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (checkInput.user_email && checkInput.user_password) {
            await axios.post("http://localhost:5000/checkUser", {
                user_email: user_email,
                user_password: user_password,
            })
                .then(function (response) {
                    if (response.data !== "User not found") {
                        localStorage.setItem('token', JSON.stringify(response.data));
                        event.target.reset();
                        navigate('/');
                        window.location.reload();
                    } else {
                        setInputTheme({ ...inputTheme, one_of_them_are_Invalid: themeValue.error });
                        setMassageWarning({ ...massageWarning, one_of_them_is_Invalid: "The email or password is incorrect" });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setInputTheme({ ...inputTheme, one_of_them_are_Invalid: themeValue.error });
            setMassageWarning({ ...massageWarning, one_of_them_is_Invalid: "Please enter all data" });
        }
    };

    function checkUserEmail(event) {
        const patternEmail = /^[A-z0-9]+([.-][A-z0-9]+)*@[A-z0-9]+\.[A-z]{2,5}$/;
        const user_email = event.target.value;
        if (user_email === '') {
            setInputTheme({ ...inputTheme, check_email: themeValue.error });
            setMassageWarning({ ...massageWarning, check_email: "This fild must not be empty" });
        }
        else if (!patternEmail.test(user_email)) {
            setInputTheme({ ...inputTheme, check_email: themeValue.error });
            setMassageWarning({ ...massageWarning, check_email: "Invalid email" });
        }
        else {
            setMassageWarning({ ...massageWarning, check_email: '' });
            setInputTheme({ ...inputTheme, check_email: themeValue.success });
            setCheckEmail(user_email);
            setCheckInput({ ...checkInput, check_email: true });
        }
    }

    async function handleCheckPIN(event) {
        event.preventDefault();
        if (checkInput.PIN) {
            await axios.post("http://localhost:5000/forgetPassword/checkUserPINCodeAndUpdatePassword", {
                user_email: checkEmail,
                user_forgot_password: checkPIN
            })
                .then(function (response) {
                    if (response.data !== "incorrect pin code") {
                        setShowCheckPIN(false);
                        setShowNewPass(true);
                    } else {
                        setInputTheme({ ...inputTheme, PIN: themeValue.error });
                        setMassageWarning({ ...massageWarning, user_PIN: "incorrect PIN" });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setInputTheme({ ...inputTheme, PIN: themeValue.error });
            setMassageWarning({ ...massageWarning, user_PIN: "Please enter PIN" });
        }
    }

    function checkUserPIN(event) {
        //Just 6 digit of number
        const patternPIN = /^\d{6}$/;
        const user_PIN = event.target.value;
        if (user_PIN === '') {
            setInputTheme({ ...inputTheme, PIN: themeValue.error });
            setMassageWarning({ ...massageWarning, user_PIN: "This fild must not be empty" });
        }
        else if (!patternPIN.test(user_PIN)) {
            setInputTheme({ ...inputTheme, PIN: themeValue.error });
            setMassageWarning({ ...massageWarning, user_PIN: "Please enter 6 digit of number" })
        }
        else {
            setMassageWarning({ ...massageWarning, user_PIN: '' });
            setInputTheme({ ...inputTheme, PIN: themeValue.success });
            setCheckPIN(user_PIN);
            setCheckInput({ ...checkInput, PIN: true });
        }
    }

    async function handleCheckEmail(event) {
        event.preventDefault();
        if (checkInput.check_email) {
            await axios.post("http://localhost:5000/forgetPassword/sendPINCode", {
                user_email: checkEmail,
            })
                .then(function (response) {
                    if (response.data !== "User not found" && response.data !== "Unable to send verification code") {
                        setShowCheckEmail(false);
                        setShowCheckPIN(true);
                    } else {
                        setInputTheme({ ...inputTheme, check_email: themeValue.error });
                        setMassageWarning({ ...massageWarning, check_email: "The email not found" });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function handleNewPassword(event) {
        // more than 8 characters, with at least 1 number, uppercase, and special characters.
        const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const user_password = event.target.value;
        if (user_password === '') {
            setInputTheme({ ...inputTheme, newPass: themeValue.error });
            setMassageWarning({ ...massageWarning, newPass: "This fild must not be empty" });
        }
        else if (!patternPassword.test(user_password)) {
            setInputTheme({ ...inputTheme, newPass: themeValue.error });
            setMassageWarning({ ...massageWarning, newPass: "Please enter a password that is at least 8 characters long and contains one uppercase letter, one number, and one special character" })
        }
        else {
            setMassageWarning({ ...massageWarning, newPass: '' });
            setInputTheme({ ...inputTheme, newPass: themeValue.success });
            setNewPass(user_password);
            setCheckInput({ ...checkInput, newPass: true });
        }
    }

    function handleConfirmPassword(event) {
        const confirmPassword = event.target.value;
        if (confirmPassword === '') {
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
            setMassageWarning({ ...massageWarning, confirmPassword: "This fild must not be empty" });
        }
        else if (confirmPassword !== newPass) {
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
            setMassageWarning({ ...massageWarning, confirmPassword: 'Password does not match' });
        }
        else {
            setMassageWarning({ ...massageWarning, confirmPassword: '' });
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.success });
            setCheckInput({ ...checkInput, confirmPassword: true });
        }
    }

    async function handleNewPass(event) {
        event.preventDefault();
        if (checkInput.newPass && checkInput.confirmPassword) {
            await axios.put("http://localhost:5000/forgetPassword/saveNewPassword", {
                user_email: checkEmail,
                user_password: newPass
            })
                .then(function (response) {
                    if (response.data === "Password reset successfully") {
                        setShowNewPass(false);
                        Swal.fire({
                            icon: "success",
                            title: "Password reset successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-md w-full space-y-5 border border-blue-500 p-4 rounded-lg">
                    <div className="text-center pb-8">
                        <img src={Logo} width={150} className="mx-auto" alt='Logo' />
                        <div className="mt-5">
                            <h3 className="text-blue-500 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={(event) => handleSubmit(event)}
                        className="space-y-5">
                        <div>
                            <label className={`font-medium text-${inputTheme.user_email}`} htmlFor='Email'>
                                Email <span className='text-red-700 text-xl'>*</span>
                            </label>
                            <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                {massageWarning.user_email}
                            </p>
                            <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                {massageWarning.one_of_them_is_Invalid}
                            </p>
                            <input
                                onBlur={(event) => handleEmail(event)}
                                id='Email'
                                placeholder='Enter your email . . .'
                                type="email"
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.user_email} text-${inputTheme.user_email}`} />
                        </div>
                        <div>
                            <label className={`font-medium text-${inputTheme.user_password}`} htmlFor='Pass'>
                                Password <span className='text-red-700 text-xl'>*</span>
                            </label>
                            <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                {massageWarning.user_password}
                            </p>
                            <input
                                onBlur={(event) => handlePassword(event)}
                                id='Pass'
                                placeholder='*********'
                                type="password"
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.user_password} text-${inputTheme.user_password}`} />
                        </div>
                        <div className="flex items-center justify-start text-sm">
                            <div
                                onClick={() => { setShowCheckEmail(true) }}
                                className="text-center text-blue-500 hover:underline cursor-pointer">
                                Forgot password?
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="w-full rounded-lg border border-current px-6 py-2 font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                            Sign in
                        </button>
                    </form>
                    <Google />
                    <p className="text-center">Don't have an account? <Link to="/signUp" className="font-medium text-blue-500 hover:underline">Sign up</Link></p>
                </div>
            </main>
            {showCheckEmail && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-left">
                            Check email
                        </h2>
                        <form onSubmit={(event) => handleCheckEmail(event)}>
                            <div>
                                <label className={`font-medium text-${inputTheme.check_email}`} htmlFor='cEmail'>
                                    Email <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                    {massageWarning.check_email}
                                </p>
                                <input
                                    onBlur={(event) => checkUserEmail(event)}
                                    id='cEmail'
                                    placeholder='Enter your email . . .'
                                    type="email"
                                    className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.check_email} text-${inputTheme.check_email}`} />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="rounded-lg border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-blue-500 hover:text-white">
                                    Send email
                                </button>
                                <button
                                    onClick={() => setShowCheckEmail(false)}
                                    className="rounded-lg border border-red-500 px-8 py-3 text-sm font-medium text-red-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showCheckPIN && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-left">
                            We sent a PIN to your email please enter the PIN
                        </h2>
                        <form onSubmit={(event) => handleCheckPIN(event)}>
                            <div>
                                <label className={`font-medium text-black`}>
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    value={checkEmail}
                                    className={`w-full mt-2 px-3 py-2 bg-gray-300 outline-none border shadow-sm rounded-lg border-black text-black`} />
                            </div>
                            <div className='mt-3'>
                                <label className={`font-medium text-${inputTheme.PIN}`} htmlFor='PIN'>
                                    PIN <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <p className={`mb-2 text-sm text-${themeValue.error}`}>
                                    {massageWarning.user_PIN}
                                </p>
                                <input
                                    onBlur={(event) => checkUserPIN(event)}
                                    id='PIN'
                                    placeholder='Enter your PIN . . .'
                                    type="text"
                                    className={`w-full px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.PIN} text-${inputTheme.PIN}`} />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="rounded-lg border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-blue-500 hover:text-white">
                                    Send PIN
                                </button>
                                <button
                                    onClick={() => setShowCheckPIN(false)}
                                    className="rounded-lg border border-red-500 px-8 py-3 text-sm font-medium text-red-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showNewPass && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-left">
                            New password
                        </h2>
                        <form onSubmit={(event) => handleNewPass(event)}>
                            <div>
                                <label className={`font-medium text-${inputTheme.newPass}`} htmlFor='newPass'>
                                    Enter new Password <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                    {massageWarning.newPass}
                                </p>
                                <input
                                    onBlur={(event) => handleNewPassword(event)}
                                    id='newPass'
                                    placeholder='*********'
                                    type="password"
                                    required
                                    className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.newPass} text-${inputTheme.newPass}`} />
                            </div>
                            <div>
                                <label className={`font-medium text-${inputTheme.confirmPassword}`} htmlFor='Confirm'>
                                    Confirm password <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <p className={`mt-2 text-sm text-${themeValue.error}`}>
                                    {massageWarning.confirmPassword}
                                </p>
                                <input
                                    onChange={(event) => handleConfirmPassword(event)}
                                    id='Confirm'
                                    placeholder='*********'
                                    type="password"
                                    required
                                    className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.confirmPassword} text-${inputTheme.confirmPassword}`} />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="rounded-lg border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-blue-500 hover:text-white">
                                    Reset Password
                                </button>
                                <button
                                    onClick={() => setShowNewPass(false)}
                                    className="rounded-lg border border-red-500 px-8 py-3 text-sm font-medium text-red-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignIn;