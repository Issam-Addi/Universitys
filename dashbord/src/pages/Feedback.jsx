import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Feedback() {

    const [reporters, setReporters] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get('http://localhost:5000/getMessages')
            .then((response) => {
                setReporters(response.data);
                setCurrentUser(response.data[0])
            })
            .catch((error) => console.log(error.message))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function HandleUser(e) {
        setCurrentUser(e)
    }

    function handleSendMessage() {
        const recipient = currentUser.email;
        const subject = `Hello`;
        const body = message;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }

    return (
        <div className="h-screen">
            <div className="px-10 pt-16 flex flex-row h-full w-full gap-6">
                <div className="flex flex-col w-52 bg-white flex-shrink-0">
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex items-center justify-center rounded-full text-blue-500 bg-blue-100 h-10 w-10">
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-xl">
                            Messages box
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-bold">
                                All messages
                            </span>
                            <span className="flex items-center justify-center bg-blue-200 h-7 w-7 rounded-full">
                                {reporters?.length}
                            </span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto">
                            {reporters?.map((reporter) => {
                                return (
                                    <button
                                        onClick={() => HandleUser(reporter)}
                                        className="flex flex-row items-center hover:bg-blue-500 rounded-xl p-2">
                                        <div className="bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full">
                                            {reporter?.user_name.charAt(0)}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">
                                            {reporter?.user_name}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-auto h-full">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-100 h-full p-4">
                        <div className="flex flex-col h-full">
                            <div className="flex flex-row items-center">
                                <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full">
                                    {currentUser?.user_name?.charAt(0)}
                                </div>
                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>{currentUser?.user_message}</div>
                                </div>
                            </div>
                        </div>
                        <form
                            onSubmit={() => handleSendMessage()}
                            className="flex items-center gap-4 w-full px-4">
                            <input
                                type="text"
                                placeholder="reply message . . ."
                                className="w-full py-2 px-6 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                onChange={(event) => setMessage(event.target.value)}
                                required />
                            <button
                                type='submit'
                                className="rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;