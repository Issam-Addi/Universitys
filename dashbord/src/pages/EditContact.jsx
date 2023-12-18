import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditContact() {

    const [our_phone, setOur_phone] = useState([]);
    const [our_email, setOur_email] = useState([]);
    const [our_location, setOur_location] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getContactData')
            .then((response) => {
                setOur_phone(response.data[0].our_phone)
                setOur_email(response.data[0].our_email)
                setOur_location(response.data[0].our_location)
            })
            .catch((error) => console.log(error.message))
    }, []);

    function handleSubmit(event) {
        event.preventDefault()
        Swal.fire({
            title: "Are you sure",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "orange",
            cancelButtonText: "Cancel",
            cancelButtonColor: "orange",
            icon: 'warning'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.put('http://localhost:5000/contactData', {
                        our_phone: our_phone,
                        our_email: our_email,
                        our_location: our_location,
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    Swal.fire("The contact us data has been updated successfully", '', 'success');
                } else
                    Swal.fire(' Cancelled', '', 'error')
            })
    }

    return (
        <section>
            <div className="px-10 pt-16">
                <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                    Edit contact us page
                </h3>
            </div>
            <div className="px-10 mt-3">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8">

                    <div className="mb-6">
                        <label htmlFor='our_phone'>Our phone</label>
                        <input
                            id="our_phone"
                            type="text"
                            placeholder="Our phone . . ."
                            value={our_phone}
                            className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                            onChange={(event) => setOur_phone(event.target.value)}
                            required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor='our_email'>Our email</label>
                        <input
                            id="our_email"
                            type="text"
                            placeholder="Our email . . ."
                            value={our_email}
                            className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                            onChange={(event) => setOur_email(event.target.value)}
                            required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor='our_location'>Our location</label>
                        <input
                            id="our_location"
                            type="text"
                            placeholder="Our location . . ."
                            value={our_location}
                            className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                            onChange={(event) => setOur_phone(event.target.value)}
                            required />
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

export default EditContact;
