/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AiFillCar, AiFillBook } from 'react-icons/ai';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	vehicleMake: z.string().nonempty('Vehicle make is required'),
	vehicleModel: z.string().nonempty('Vehicle model is required'),
	ownerName: z.string().nonempty("Owner's name is required"),
	ownerEmail: z
		.string()
		.email('Invalid email address')
		.nonempty("Owner's email is required"),
	otherInfo: z.string().nonempty('Other information is required'),
});

const NewVehicle = () => {
	const { userId, isSignedIn, isLoaded } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoaded) {
			!isSignedIn && navigate('/sign-in/*');
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: any) => {
		console.log(data);
		// You can perform any further actions, such as API calls or state updates, with the form data
	};
	return (
		<Layout>
			<div className='w-full my-15 mx-auto px-6 py-8'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2 className='text-2xl font-bold  bg-red-500 text-white p-5 flex items-center justify-between'>
						Vehicle Information
						<AiFillCar />
					</h2>
					{/* Vehicle Information form fields go here */}
					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
							<div>
								<input
									type='text'
									placeholder='Vehicle Make'
									{...register('vehicleMake')}
									className='p-3 w-96 placeholder:text-[#777777] bg-white rounded-lg outline-none border-2 border-gray-300'
								/>
								{errors.vehicleMake && <p>{errors.vehicleMake.message}</p>}
							</div>

							<div>
								<input
									type='text'
									placeholder='Vehicle Model'
									{...register('vehicleModel')}
									className='p-3 w-96 placeholder:text-[#777777] bg-white rounded-lg outline-none border-2 border-gray-300'
								/>
								{errors.vehicleModel && <p>{errors.vehicleModel.message}</p>}
							</div>
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-8  bg-red-500 text-white p-5 flex items-center justify-between'>
						Owner's Information
						<BiSolidUserRectangle />
					</h2>
					{/* Owner's Information form fields go here */}

					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
						<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
								<div>
									<input
										type='text'
										placeholder="Owner's Name"
										className='p-3 w-96 placeholder:text-[#777777] bg-white rounded-lg outline-none border-2 border-gray-300'
										{...register('ownerName')}
									/>
									{errors.ownerName && <p>{errors.ownerName.message}</p>}
								</div>

								<div>
									<input
										type='text'
										placeholder="Owner's Email"
										className='p-3 w-96 placeholder:text-[#777777] bg-white rounded-lg outline-none border-2 border-gray-300'
										{...register('ownerEmail')}
									/>
									{errors.ownerEmail && <p>{errors.ownerEmail.message}</p>}
								</div>
							</div>
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-8  bg-red-500 text-white p-5 flex items-center justify-between'>
						Other Information
						<AiFillBook />
					</h2>
					{/* Other Information form fields go here */}

					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
						<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
								<div>
									<input
										type='text'
										placeholder='Other Information'
										className='p-3 w-96 placeholder:text-[#777777] bg-white rounded-lg outline-none border-2 border-gray-300'
										{...register('otherInfo')}
									/>
									{errors.otherInfo && <p>{errors.otherInfo.message}</p>}
								</div>
							</div>
						</div>
					</div>

					<button
						type='submit'
						className='w-full px-4 py-3 mt-3 bg-blue-500 font-semibold text-lg text-white rounded-lg hover:bg-blue-600 focus:outline-none'
					>
						Submit
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default NewVehicle;
