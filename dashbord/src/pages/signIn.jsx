import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../assets/image/Logo.png";

function SignIn() {

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
            await axios.post("http://localhost:5000/checkAdmin", {
                user_email: user_email,
                user_password: user_password,
            })
                .then(function (response) {
                    if (response.data !== "User not found") {
                        localStorage.setItem('token', JSON.stringify(response.data));
                        event.target.reset();
                        window.location.href = '/';
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
                            <h3 className="text-blue-500 text-2xl font-bold sm:text-3xl">Log in to your admin dashbord</h3>
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
                        <button className="w-full rounded-lg border border-current px-6 py-2 font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                            Sign in
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default SignIn;