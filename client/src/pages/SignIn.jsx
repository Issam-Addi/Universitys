import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../assets/image/Logo.png";

function SignIn() {

    const navigate = useNavigate();

    const [user_email, setUser_email] = useState("");
    const [user_password, setUser_password] = useState("");

    const themeValue = {
        normal: "black",
        error: "red-500",
        success: "green-500"
    };

    const [massageWarning, setMassageWarning] = useState({
        user_email: '',
        user_password: '',
        one_of_them_is_Invalid: '',
        check_email: ''
    });

    const [inputTheme, setInputTheme] = useState({
        user_email: themeValue.normal,
        user_password: themeValue.normal,
        one_of_them_are_Invalid: themeValue.normal
    });

    const [checkInput, setCheckInput] = useState({
        user_email: false,
        user_password: false,
        check_email: false,
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
                        <div>
                            <div className="flex items-center justify-start text-sm">
                                <button
                                    className="text-center text-blue-500 hover:underline"
                                    // onClick={handleButtonClick}
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        <button className="w-full rounded-lg border border-current px-6 py-2 font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                            Sign in
                        </button>
                    </form>

                    <button
                        className="w-full flex items-center justify-center gap-x-3 py-2.5 text-sm font-medium rounded-lg border border-current md:text-sm border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:text-black hover:shadow-lg hover:shadow-blue-500"
                        id="customBtn">
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center">Don't have an account? <Link to="/signUp" className="font-medium text-blue-500 hover:underline">Sign up</Link></p>
                </div>
            </main>
        </div>
    )
}

export default SignIn;