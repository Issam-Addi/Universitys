import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ImLocation } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import contactHero from "../assets/image/contactHero.png"

function ContactUs() {

    const [contactUsData, setContactUsData] = useState({});

    useEffect(() => {
        const getAboutData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getContactData');
                setContactUsData(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAboutData();
    }, [contactUsData]);

    const [user_name, setUser_name] = useState("");
    const [user_email, setUser_email] = useState("");
    const [user_phone, setUser_phone] = useState("");
    const [user_message, setUser_message] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contactMessage = { user_name, user_email, user_phone, user_message };

        try {
            const response = await axios.post("http://localhost:5000/sendMessages", contactMessage);
            if (response.status === 200) {
                Swal.fire("Success", "Message sent successfully!", "success");
                setUser_name("");
                setUser_email("");
                setUser_phone("");
                setUser_message("");
            } else {
                Swal.fire("Error", "Failed to send message.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "An error occurred during form submission.", "error");
        }
    };

    return (
        <div>
            <div
                className="bg-cover bg-center h-screen"
                style={{ backgroundImage: `url(${contactHero})`, height: "39.2rem" }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Get in touch with us</h1>
                        <nav className="text-white mb-8">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link to="/" className="text-blue-500 hover:text-white hover:underline transition">
                                        Home
                                    </Link>
                                    <span className="mx-2"><AiOutlineRight /></span>
                                </li>
                                <li>Contact Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section className="relative z-10 overflow-hidden py-28">
                <div className="flex flex-wrap lg:justify-between max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-1/2 xl:w-6/12">
                        <div className="mb-8 lg:mb-0">
                            <h2 className="mb-6 text-blue-500 sm:text-[40px]">
                                Get in touch with us
                            </h2>
                            <h4 className="mb-8">
                                If you have any questions or feel confused about something,
                                do not hesitate and contact us now...we are here for you
                            </h4>
                            <div className="mb-8 flex w-full max-w-[370px]">
                                <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                                    <ImLocation className='w-7 h-7' />
                                </div>
                                <div className="w-full">
                                    <p className="pt-5 text-base hover:text-blue-500 transition cursor-default">
                                        {contactUsData[0]?.our_location}
                                    </p>
                                </div>
                            </div>
                            <a href="tel://+ 962 786 992 500">
                                <div className="mb-8 flex w-full max-w-[370px]">
                                    <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                                        <BsFillTelephoneFill className='w-7 h-7' />
                                    </div>
                                    <div className="w-full">
                                        <p className="pt-5 text-base hover:text-blue-500 hover:underline transition">
                                            {contactUsData[0]?.our_phone}
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a href="mailto:essam.h.addi@gmail.com">
                                <div className="mb-8 flex w-full max-w-[370px]">
                                    <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                                        <IoMdMail className='w-7 h-7' />
                                    </div>
                                    <div className="w-full">
                                        <p className="pt-5 text-base hover:text-blue-500 hover:underline transition">
                                            {contactUsData[0]?.our_email}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 xl:w-5/12 bg-white">
                        <div className="relative rounded-lg p-8 border border-blue-500 sm:p-12">
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor='name'>Name <span className='text-red-700 text-xl'>*</span></label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUser_name(event.target.value)}
                                        required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor='email'>Email <span className='text-red-700 text-xl'>*</span></label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUser_email(event.target.value)}
                                        required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor='Phone'>Phone <span className='text-red-700 text-xl'>*</span></label>
                                    <input
                                        id="Phone"
                                        type="text"
                                        placeholder="Your Phone"
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUser_phone(event.target.value)}
                                        required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor='message'>Message <span className='text-red-700 text-xl'>*</span></label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Your Message"
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUser_message(event.target.value)}
                                        required />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-1/2 rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                        Send
                                    </button>
                                </div>
                            </form>
                            <div>
                                <span className="absolute -right-10 top-[90px] z-[-1]">
                                    <svg
                                        width={34}
                                        height={134}
                                        viewBox="0 0 34 134"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="31.9993"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 1.66665)"
                                            fill="#3b82f6" />
                                    </svg>
                                </span>
                                <span className="absolute -left-7 -bottom-7 z-[-1]">
                                    <svg
                                        width={107}
                                        height={134}
                                        viewBox="0 0 107 134"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="104.999"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 104.999 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 104.999 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 104.999 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 104.999 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 104.999 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 104.999 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 104.999 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 104.999 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 104.999 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="104.999"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 104.999 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 90.3333 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 90.3333 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 90.3333 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 90.3333 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 90.3333 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 90.3333 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 90.3333 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 90.3333 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 90.3333 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="90.3333"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 90.3333 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 75.6654 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 75.6654 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 75.6654 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 75.6654 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 75.6654 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 75.6654 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 75.6654 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 75.6654 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 31.9993 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 75.6654 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="75.6654"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 75.6654 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="31.9993"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 31.9993 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 60.9993 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 60.9993 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 60.9993 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 60.9993 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 60.9993 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 60.9993 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 60.9993 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 60.9993 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 17.3333 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 60.9993 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="60.9993"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 60.9993 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="17.3333"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 17.3333 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 46.3333 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={132}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 132)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 46.3333 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="117.333"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 117.333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 46.3333 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="102.667"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 102.667)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 46.3333 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={88}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 88)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 46.3333 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="73.3333"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 73.3333)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 46.3333 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={45}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 45)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 46.3333 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={16}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 16)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 46.3333 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy={59}
                                            r="1.66667"
                                            transform="rotate(180 2.66536 59)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 46.3333 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="30.6666"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 30.6666)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="46.3333"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 46.3333 1.66665)"
                                            fill="#3b82f6" />
                                        <circle
                                            cx="2.66536"
                                            cy="1.66665"
                                            r="1.66667"
                                            transform="rotate(180 2.66536 1.66665)"
                                            fill="#3b82f6" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUs;
