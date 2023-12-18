import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import aboutHero from "../assets/image/about-us-pic.jpg"

function AboutUs() {

    const [aboutUsData, setAboutUsData] = useState({});

    useEffect(() => {
        const getAboutData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAboutUsData');
                setAboutUsData(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getAboutData();

    }, []);

    const features = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            title: "Moving fast",
            desc: "Reducing time and effort searching for the rogue bus."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>,
            title: "Accurate data",
            desc: "Be aware of the updated data first."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "Availability of all universities",
            desc: "Find out information about universities and ways to reach them."
        },

    ]

    const team = [
        {
            avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Martiana dialan",
            title: "Product designer",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "/",
            twitter: "/",
        },
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Micheal colorand",
            title: "Software engineer",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "/",
            twitter: "/",
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Brown Luis",
            title: "Full stack engineer",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "/",
            twitter: "/",
        }
    ]

    return (
        <div>
            <div
                className="bg-cover bg-center h-screen"
                style={{ backgroundImage: `url(${aboutHero})`, height: "39.2rem" }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
                        <nav className="text-white mb-8">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link to="/" className="text-blue-500 hover:text-white hover:underline transition">
                                        Home
                                    </Link>
                                    <span className="mx-2"><AiOutlineRight /></span>
                                </li>
                                <li>About Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="pt-10 overflow-hidden">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl text-center font-bold text-blue-500">
                                Main features
                            </h2>
                        </div>
                        <div className="mt-16 grid border divide-x divide-y rounded-lg overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3">
                            {
                                features.map((item, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="relative p-8 space-y-8 transform">
                                            <div className="flex-none w-12 h-12 bg-black text-blue-500 rounded-lg flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="text-xl font-medium transition group-hover:text-blue-500">
                                                    {item.title}
                                                </h5>
                                                <p className="text-sm">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <section className="overflow-hidden py-28">
                <div className="flex flex-wrap items-center max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-1/2">
                        <div className="sm:flex items-center gap-8 hidden">
                            <div className="w-full xl:w-1/2">
                                <div className="border border-blue-500 rounded-lg mb-4">
                                    <img
                                        src={aboutUsData[0]?.about_image_no_one}
                                        alt="about"
                                        className="w-full rounded-lg" />
                                </div>
                                <div className="border border-blue-500 rounded-lg">
                                    <img
                                        src={aboutUsData[0]?.about_image_no_two}
                                        alt="about"
                                        className="w-full rounded-lg" />
                                </div>
                            </div>
                            <div className="w-full xl:w-1/2 ">
                                <div className="relative z-10 border border-blue-500 rounded-lg">
                                    <img
                                        src={aboutUsData[0]?.about_image_no_three}
                                        alt="about"
                                        className="w-full rounded-lg" />
                                    <span className="absolute -right-7 -bottom-7 z-[-1]">
                                        <svg
                                            width={134}
                                            height={106}
                                            viewBox="0 0 134 106"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="1.66667"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 31 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3334"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 60.3334 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 117.667 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 103 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy={104}
                                                r="1.66667"
                                                transform="rotate(-90 132 104)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 89.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 89.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 89.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="89.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 89.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 103 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="89.3338"
                                                r="1.66667"
                                                transform="rotate(-90 132 89.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="74.6673"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 74.6673)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 31.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 31.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 31 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 31 31.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="31.0003"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 31.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 103 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 103 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="74.6668"
                                                r="1.66667"
                                                transform="rotate(-90 132 74.6668)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="30.9998"
                                                r="1.66667"
                                                transform="rotate(-90 132 30.9998)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 31 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 103 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 103 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="60.0003"
                                                r="1.66667"
                                                transform="rotate(-90 132 60.0003)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="16.3333"
                                                r="1.66667"
                                                transform="rotate(-90 132 16.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 45.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="1.66667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 1.66667 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 45.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="16.3333"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 16.3333 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 31 45.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={31}
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 31 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="45.3333"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 45.3333)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="45.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 45.6667 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="60.3333"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 60.3333 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="88.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 88.6667 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="117.667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 117.667 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx="74.6667"
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 74.6667 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 103 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={103}
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 103 1.66683)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="45.3338"
                                                r="1.66667"
                                                transform="rotate(-90 132 45.3338)"
                                                fill="#3b82f6"
                                            />
                                            <circle
                                                cx={132}
                                                cy="1.66683"
                                                r="1.66667"
                                                transform="rotate(-90 132 1.66683)"
                                                fill="#3b82f6"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 text-center pt-10 text-black capitalize ">
                        <div className="">
                            <h2 className="text-blue-500 mb-8 text-4xl font-bold sm:text-4xl">
                                {aboutUsData[0]?.about_title}
                            </h2>
                            <p className="text-body-color mb-8 text-base">
                                {aboutUsData[0]?.about_description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-28">
                <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
                    <div className="text-left">
                        <h3 className="text-3xl text-blue-500 font-semibold sm:text-4xl">
                            Meet our team
                        </h3>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {
                                team.map((item, idx) => (
                                    <li key={idx}>
                                        <div className="w-24 h-24 mx-auto">
                                            <img
                                                src={item.avatar}
                                                className="w-full h-full rounded-full"
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="text-black font-semibold sm:text-lg">{item.name}</h4>
                                            <p className="text-blue-500">{item.title}</p>
                                            <p className="text-black mt-2">{item.desc}</p>
                                            <div className="mt-4 flex justify-center gap-4 text-blue-500">
                                                <a href={item.twitter}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-blue-700" fill="currentColor" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                                <a href={item.linkedin}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-blue-700" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutUs;
