import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    // image key
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    // data load using useQuery
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-khaki-theta.vercel.app/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        // console.log(data.image[0]);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    // console.log(imgData.data.url);

                    // creating object to save in server
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }

                    // save doctors information to the database
                    fetch('https://doctors-portal-server-khaki-theta.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} added successfully`)
                            navigate('/dashboard/managedoctors')
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className='text-3xl text-center'>Add a doctor</h2>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                {/* name */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>

                    <input type="text" {...register("name", { required: "Name is Required" })} className="input input-bordered w-full max-w-xs" />

                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                </div>

                {/* email */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", { required: "email is required" })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                </div>

                {/* specialty */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Specialty</span></label>
                    <select {...register('specialty')} className="select select-bordered w-full max-w-xs">
                        {/* <option disabled selected>Please Select a Specialty</option> */}
                        {
                            specialties.map(specialty =>
                                <option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
                        }
                    </select>
                </div>

                {/* photo upload */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", { required: "Photo is Required" })} className="input input-bordered w-full max-w-xs" />

                    {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                </div>

                <input type="submit" className='btn btn-accent w-full mt-6' value="Add Doctor" />
            </form>
        </div>
    );
};

export default AddDoctor;

/* 
    * Three (3) places, where you can store your images
    * 1. 3rd party image hosting server
    * 2. File system of your own server 
    * 3. mongoDB (database)
*/