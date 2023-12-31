import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../assets/image/Logo.png";
import Google from '../components/Google';

function SignUp() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [user_name, setUser_name] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_password, setUser_password] = useState("");

  const themeValue = {
    normal: "black",
    error: "red-500",
    success: "green-500"
  };

  const [massageWarning, setMassageWarning] = useState({
    user_name: '',
    user_phone: '',
    user_email: '',
    user_password: '',
    confirmPassword: '',
    data: ''
  });

  const [inputTheme, setInputTheme] = useState({
    user_name: themeValue.normal,
    user_phone: themeValue.normal,
    user_email: themeValue.normal,
    user_password: themeValue.normal,
    confirmPassword: themeValue.normal,
  });

  const [checkInput, setCheckInput] = useState({
    user_name: false,
    user_phone: false,
    user_email: false,
    user_password: false,
    confirmPassword: false
  });

  function handleName(event) {
    const user_name = event.target.value;
    if (user_name === '') {
      setInputTheme({ ...inputTheme, user_name: themeValue.error });
      setMassageWarning({ ...massageWarning, user_name: "This fild must not be empty" });
    }
    else {
      setInputTheme({ ...inputTheme, user_name: themeValue.success });
      setMassageWarning({ ...massageWarning, user_name: "" });
      setUser_name(user_name);
      setCheckInput({ ...checkInput, user_name: true });
    }
  }

  function handlePhone(event) {
    const patternPhone = /^07\d{8}$/;
    const user_phone = event.target.value;
    if (user_phone === '') {
      setInputTheme({ ...inputTheme, user_phone: themeValue.error });
      setMassageWarning({ ...massageWarning, user_phone: "This fild must not be empty" });
    }
    else if (!patternPhone.test(user_phone)) {
      setInputTheme({ ...inputTheme, user_phone: themeValue.error });
      setMassageWarning({ ...massageWarning, user_phone: 'This field must start with 07 followed by 8 numbers' });
    }
    else {
      setMassageWarning({ ...massageWarning, user_phone: '' });
      setInputTheme({ ...inputTheme, user_phone: themeValue.success });
      setUser_phone(user_phone);
      setCheckInput({ ...checkInput, user_phone: true });
    }
  }

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

  function handleConfirmPassword(event) {
    const confirmPassword = event.target.value;
    if (confirmPassword === '') {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
      setMassageWarning({ ...massageWarning, confirmPassword: "This fild must not be empty" });
    }
    else if (confirmPassword !== user_password) {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
      setMassageWarning({ ...massageWarning, confirmPassword: 'Password does not match' });
    }
    else {
      setMassageWarning({ ...massageWarning, confirmPassword: '' });
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.success });
      setCheckInput({ ...checkInput, confirmPassword: true });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (checkInput.user_name && checkInput.user_phone && checkInput.user_email && checkInput.user_password && checkInput.confirmPassword) {
        await axios.post("http://localhost:5000/AddNewUSer", {
          user_name: user_name,
          user_phone: user_phone,
          user_email: user_email,
          user_password: user_password,
        })
          .then(function (response) {
            if (response.data !== "Email is already exist") {
              localStorage.setItem('token', JSON.stringify(response.data));
              event.target.reset();
              navigate('/');
              window.location.reload();
            } else {
              setInputTheme({ ...inputTheme, user_email: themeValue.error });
              setMassageWarning({ ...massageWarning, user_email: "This Email is already taken" });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="w-full my-28 h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full space-y-5 sm:max-w-md border border-blue-500 p-4 rounded-lg">
        <div className="text-center">
          <img src={Logo} width={150} className="mx-auto" alt='Logo' />
          <div className="mt-5 space-y-2">
            <h3 className="text-blue-500 text-2xl font-bold sm:text-3xl">Create an account</h3>
            <p>Already have an account? <Link to="/signIn" className="font-medium text-blue-500 hover:underline">Log in</Link></p>
          </div>
        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="space-y-5">

          <div>
            <label className={`font-medium text-${inputTheme.user_name}`} htmlFor='Name'>
              Name <span className='text-red-700 text-xl'>*</span>
            </label>
            <p className={`mt-2 text-sm text-${themeValue.error}`}>
              {massageWarning.user_name}
            </p>
            <input
              onBlur={(event) => handleName(event)}
              id='Name'
              placeholder='Enter your name . . .'
              type="text"
              required
              className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.user_name} text-${inputTheme.user_name}`} />
          </div>

          <div>
            <label className={`font-medium text-${inputTheme.user_phone}`} htmlFor='Phone'>
              Phone <span className='text-red-700 text-xl'>*</span>
            </label>
            <p className={`mt-2 text-sm text-${themeValue.error}`}>
              {massageWarning.user_phone}
            </p>
            <input
              onBlur={(event) => handlePhone(event)}
              id='Phone'
              placeholder='Enter your phone . . .'
              type="text"
              required
              className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.user_phone} text-${inputTheme.user_phone}`} />
          </div>

          <div>
            <label className={`font-medium text-${inputTheme.user_email}`} htmlFor='Email'>
              Email <span className='text-red-700 text-xl'>*</span>
            </label>
            <p className={`mt-2 text-sm text-${themeValue.error}`}>
              {massageWarning.user_email}
            </p>
            <input
              onBlur={(event) => handleEmail(event)}
              id='Email'
              placeholder='Enter your email . . .'
              type="email"
              required
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
              required
              className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border shadow-sm rounded-lg border-${inputTheme.user_password} text-${inputTheme.user_password}`} />
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
          <button className="w-full rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
            Create account
          </button>
        </form>
        <div className="mt-5">
          <Google/>
        </div>
      </div>

    </main>
  )
}

export default SignUp;