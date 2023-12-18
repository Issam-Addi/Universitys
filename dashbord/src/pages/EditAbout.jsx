import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditAbout() {

    const [about_description, setAbout_description] = useState([]);
    const [about_title, setAbout_title] = useState([]);
    const [about_image_no_one, setAbout_image_no_one] = useState([]);
    const [about_image_no_two, setAbout_image_no_two] = useState([]);
    const [about_image_no_three, setAbout_image_no_three] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getAboutUsData')
            .then((response) => {
                setAbout_title(response.data[0].about_title)
                setAbout_description(response.data[0].about_description)
                setAbout_image_no_one(response.data[0].about_image_no_one)
                setAbout_image_no_two(response.data[0].about_image_no_two)
                setAbout_image_no_three(response.data[0].about_image_no_three)
            })
            .catch((error) => console.log(error.message))
    }, []);

    // image one
    const onLoadOne = fileString => {
        setAbout_image_no_one(fileString);
    };

    const getBase64ForOne = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoadOne(reader.result);
        };
    };

    const handleImageOne = (event) => {
        const file = event.target.files[0];
        getBase64ForOne(file);
    };

    const removeImageOne = () => {
        setAbout_image_no_one(null);
    };

    // image two
    const onLoadTwo = fileString => {
        setAbout_image_no_two(fileString);
    };

    const getBase64ForTwo = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoadTwo(reader.result);
        };
    };

    const handleImageTwo = (event) => {
        const file = event.target.files[0];
        getBase64ForTwo(file);
    };

    const removeImageTwo = () => {
        setAbout_image_no_two(null);
    };

    // image three
    const onLoadThree = fileString => {
        setAbout_image_no_three(fileString);
    };

    const getBase64ForThree = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoadThree(reader.result);
        };
    };

    const handleImageThree = (event) => {
        const file = event.target.files[0];
        getBase64ForThree(file);
    };

    const removeImageThree = () => {
        setAbout_image_no_three(null);
    };

    function handleSubmit(event) {
        event.preventDefault()
        Swal.fire({
            title: "Are you sure",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "blue",
            icon: 'warning'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.put('http://localhost:5000/aboutUsData', {
                        about_description: about_description,
                        about_title: about_title,
                        about_image_no_one: about_image_no_one,
                        about_image_no_two: about_image_no_two,
                        about_image_no_three: about_image_no_three,
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    Swal.fire("The about us has been updated successfully", '', 'success');
                } else
                    Swal.fire(' Cancelled', '', 'error')
            })
    }

    return (
        <section>
            <div className="px-10 pt-16">
                <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                    Edit about us page
                </h3>
            </div>
            <div className="px-10 mt-6">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8">
                        <div className="grid grid-cols-2 items-start justify-center w-full gap-6 ">
                    <div className="mb-6">
                        <label htmlFor='about_title'>About title</label>
                        <input
                            id="about_title"
                            type="text"
                            placeholder="About title . . ."
                            value={about_title}
                            className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                            onChange={(event) => setAbout_title(event.target.value)}
                            required />
                    </div>
                    <div>
                        <label htmlFor='about_description'>About description</label>
                        <textarea
                            rows={6}
                            id="about_description"
                            type="text"
                            placeholder="About description . . ."
                            value={about_description}
                            className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                            onChange={(event) => setAbout_description(event.target.value)}
                            required />
                    </div>
                    </div>
                    <div className="grid grid-cols-3 items-center justify-center w-full gap-6 !m-0">
                        <label
                            htmlFor="top_left"
                            className="flex flex-col items-center justify-center mt-10 w-full h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-blue-100">
                            {about_image_no_one ? (
                                <>
                                    <img
                                        src={about_image_no_one}
                                        alt="Selected"
                                        className="w-28 h-28 mb-2 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="text-sm text-red-500 font-semibold"
                                        onClick={removeImageOne}>
                                        Remove
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        className="w-8 h-8 mb-4 text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-black font-semibold">
                                        Click to upload top left image
                                    </p>
                                    <p className="text-xs text-black">
                                        SVG, PNG or JPG
                                    </p>
                                </div>
                            )}
                            <input
                                id="top_left"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(event) => handleImageOne(event)}
                                required
                            />
                        </label>

                        <label
                            htmlFor="bottum_left"
                            className="flex flex-col items-center justify-center mt-10 w-full h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-blue-100">
                            {about_image_no_two ? (
                                <>
                                    <img
                                        src={about_image_no_two}
                                        alt="bottum_left"
                                        className="w-28 h-28 mb-2 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="text-sm text-red-500 font-semibold"
                                        onClick={removeImageTwo}>
                                        Remove
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        className="w-8 h-8 mb-4 text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-black font-semibold">
                                        Click to upload bottum left image
                                    </p>
                                    <p className="text-xs text-black">
                                        SVG, PNG or JPG
                                    </p>
                                </div>
                            )}
                            <input
                                id="bottum_left"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(event) => handleImageTwo(event)}
                                required
                            />
                        </label>

                        <label
                            htmlFor="solo"
                            className="flex flex-col items-center justify-center mt-10 w-full h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-blue-100">
                            {about_image_no_three ? (
                                <>
                                    <img
                                        src={about_image_no_three}
                                        alt="solo"
                                        className="w-28 h-28 mb-2 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="text-sm text-red-500 font-semibold"
                                        onClick={removeImageThree}>
                                        Remove
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        className="w-8 h-8 mb-4 text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-black font-semibold">
                                        Click to upload solo image
                                    </p>
                                    <p className="text-xs text-black">
                                        SVG, PNG or JPG
                                    </p>
                                </div>
                            )}
                            <input
                                id="solo"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(event) => handleImageThree(event)}
                                required
                            />
                        </label>

                    </div>

                    <div className='flex justify-center'>
                        <button type='submit'
                            className="rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditAbout;
