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
import { firestore } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { notifyError, notifySuccess } from '../utils/notification';

const schema = z.object({
	vehicleCategory: z.string().nonempty(),
	vehicleSubCategory: z.string().nonempty(),
	model: z.string().nonempty(),
	oldPlateNumber: z.string(),
	engineNumber: z.string().nonempty(),
	policyNumber: z.string().nonempty(),
	vehicleMake: z.string().nonempty(),
	vehicleType: z.string().nonempty(),
	chassisNo: z.union([z.string(), z.number()]),
	fuelType: z.string().nonempty(),
	yearOfManufacture: z.string(),
	odometer: z.union([z.string(), z.number()]),
	tankCapacity: z.union([z.string(), z.number()]),
	engineCapacity: z.union([z.string(), z.number()]),
	color: z.string().nonempty(),
	ownerIdentification: z.string().nonempty(),
	address: z.string().nonempty(),
	title: z.string().nonempty(),
	city: z.string().nonempty(),
	mobileNumber: z.string().nonempty(),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	identificationNo: z.union([
		z.string().nonempty(),
		z.number().int().positive(),
	]),
	email: z.string().nonempty().email(),
	state: z.string().nonempty(),
	localGovernment: z.string().nonempty(),
	driverLicenseNumber: z.string().min(5),
	stateOfPlateNumberAllocation: z.string(),
	licenseBearersName: z.string(),
});

const NewVehicle = () => {
	const { userId, isSignedIn, isLoaded } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoaded) {
			!isSignedIn && navigate('/sign-in/*');
			console.log(userId, isSignedIn);
		}
	}, []);

	function generateRandomWord() {
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';

		let word = '';
		word += alphabet[Math.floor(Math.random() * alphabet.length)]; // First letter (A-Z)
		word += alphabet[Math.floor(Math.random() * alphabet.length)]; // Second letter (A-Z)
		word += numbers[Math.floor(Math.random() * numbers.length)]; // First number (0-9)
		word += numbers[Math.floor(Math.random() * numbers.length)]; // Second number (0-9)
		word += alphabet[Math.floor(Math.random() * alphabet.length)]; // Third letter (A-Z)
		word += alphabet[Math.floor(Math.random() * alphabet.length)]; // Fourth letter (A-Z)
		word += alphabet[Math.floor(Math.random() * alphabet.length)]; // Fifth letter (A-Z)

		return word;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: any) => {
		data.userId = userId;
		data.plateNumber = generateRandomWord();
		// You can perform any further actions, such as API calls or state updates, with the form data

		addDoc(collection(firestore, 'Vehicles'), data)
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id);
				notifySuccess('Vehicle Registration was Successful');
				navigate('/vehicles');
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
				notifyError('Vehicle Registration was Unsuccessful, Please Try Again');
			});
	};
	return (
		<Layout>
			<div className='w-full my-15 mx-auto px-6 py-8'>
				<h1 className='text-xl md:text-4xl my-10 '>VEHICLE LICENSING SYSTEM</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2 className='text-2xl font-bold  bg-blue-500 text-white p-5 flex items-center justify-between'>
						Vehicle Information
						<AiFillCar />
					</h2>
					{/* Vehicle Information form fields go here */}
					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='vehicleCategory'
							>
								Vehicle Category
							</label>
							<select
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='vehicleCategory'
								{...register('vehicleCategory')}
							>
								<option value=''>-- Select Vehicle Category --</option>
								<option value='commercial'>Commercial</option>
								<option value='private'>Private</option>
								<option value='government'>Government</option>
							</select>
							{errors.vehicleCategory && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='vehicleSubCategory'
							>
								Vehicle Sub-Category
							</label>
							<select
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='vehicleSubCategory'
								{...register('vehicleSubCategory')}
							>
								<option value=''>-- Select Vehicle Sub-Category --</option>
								<option value='car'>Motor Vehicle</option>
								<option value='keke'>Keke Napep</option>
								<option value='bike'>Motor Cycle</option>
							</select>
							{errors.vehicleSubCategory && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='model'
							>
								Model
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='Toyota Camry'
								id='model'
								{...register('model')}
							/>
							{errors.model && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='oldPlateNumber'
							>
								Old Plate Number
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								placeholder='AB123CD'
								id='oldPlateNumber'
								{...register('oldPlateNumber')}
							/>
							{errors.oldPlateNumber && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='engineNumber'
							>
								Engine Number
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='engineNumber'
								placeholder='123456789'
								{...register('engineNumber')}
							/>
							{errors.engineNumber && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='policyNumber'
							>
								Policy Number
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='policyNumber'
								placeholder='P123456'
								{...register('policyNumber')}
							/>
							{errors.policyNumber && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='vehicleMake'
							>
								Vehicle Make
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='vehicleMake'
								placeholder='Toyota'
								{...register('vehicleMake')}
							/>
							{errors.vehicleMake && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='vehicleType'
							>
								Vehicle Type
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='vehicleType'
								placeholder='Pick Up, SUV, etc.'
								{...register('vehicleType')}
							/>
							{errors.vehicleType && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='chassisNo'
							>
								Chassis No
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='chassisNo'
								placeholder='XYZ789'
								{...register('chassisNo')}
							/>
							{errors.chassisNo && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='fuelType'
							>
								Fuel Type
							</label>
							<select
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='fuelType'
								{...register('fuelType')}
							>
								<option value=''>-- Select Fuel Type --</option>
								<option value='Petrol'>Petrol</option>
								<option value='Diesel'>Diesel</option>
								<option value='Bio-fuel'>Bio Fuel</option>
								<option value='Others'>Others</option>
							</select>
							{errors.fuelType && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='yearOfManufacture'
							>
								Year of Manufacture
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='date'
								id='yearOfManufacture'
								{...register('yearOfManufacture')}
							/>
							{errors.yearOfManufacture && (
								<span className='text-red-500'>Invalid year</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='odometer'
							>
								Odometer
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='odometer'
								placeholder='50,000'
								{...register('odometer')}
							/>
							{errors.odometer && (
								<span className='text-red-500'>Invalid odometer reading</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='tankCapacity'
							>
								Tank Capacity
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='tankCapacity'
								placeholder='60'
								{...register('tankCapacity')}
							/>
							{errors.tankCapacity && (
								<span className='text-red-500'>Invalid tank capacity</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='engineCapacity'
							>
								Engine Capacity
							</label>
							<select
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='engineCapacity'
								{...register('engineCapacity')}
							>
								<option value=''>-- Select Engine Capacity --</option>
								<option value='high'>Above 3.0</option>
								<option value='low'>Below 1.6</option>
								<option value='mid'>Between 1.6 to 2.0</option>
								<option value='good'>Between 2.0 to 3.0</option>
							</select>
							{errors.engineCapacity && (
								<span className='text-red-500'>Invalid engine capacity</span>
							)}
						</div>

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='color'
							>
								Color
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='text'
								id='color'
								placeholder='Black'
								{...register('color')}
							/>
							{errors.color && (
								<span className='text-red-500'>This field is required</span>
							)}
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-8  bg-blue-500 text-white p-5 flex items-center justify-between'>
						Owner's Information
						<BiSolidUserRectangle />
					</h2>
					{/* Owner's Information form fields go here */}

					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 '>
						<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='ownerIdentification'
								>
									Owner Identification
								</label>
								<select
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='ownerIdentification'
									{...register('ownerIdentification')}
								>
									<option value=''>-- Select Owner ID Type --</option>
									<option value='Driver License'>Driver's License</option>
									<option value='NIN'>National Identity Number</option>
									<option value="Int'l Passport">International Passport</option>
									<option value='TIN'>Tax Identification Number</option>
									<option value='Company RC'>Company's RC Number</option>
								</select>
								{errors.ownerIdentification && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='address'
								>
									Address
								</label>
								<textarea
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='address'
									placeholder='123 Main Street, City'
									{...register('address')}
								/>
								{errors.address && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='title'
								>
									Title
								</label>
								<select
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='title'
									{...register('title')}
								>
									<option value=''>-- Select Title --</option>
									<option value='Mr'>Mr</option>
									<option value='Mrs'>Mrs</option>
									<option value='Miss'>Miss</option>
									<option value='Dr'>Dr</option>
								</select>
								{errors.title && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='city'
								>
									City
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='city'
									placeholder='Enter your city'
									{...register('city')}
								/>
								{errors.city && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='mobileNumber'
								>
									Mobile Number
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='mobileNumber'
									{...register('mobileNumber')}
								/>
								{errors.mobileNumber && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='firstName'
								>
									First Name
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='firstName'
									placeholder='John'
									{...register('firstName')}
								/>
								{errors.firstName && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='lastName'
								>
									Last Name
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='lastName'
									placeholder='Doe'
									{...register('lastName')}
								/>
								{errors.lastName && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='identificationNo'
								>
									Identification No
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='identificationNo'
									placeholder='123456789'
									{...register('identificationNo')}
								/>
								{errors.identificationNo && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='email'
								>
									Email
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='email'
									id='email'
									placeholder='johndoe@example.com'
									{...register('email')}
								/>
								{errors.email && (
									<span className='text-red-500'>Invalid email address</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='state'
								>
									State
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='state'
									placeholder='Enter your state'
									{...register('state')}
								/>
								{errors.state && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='localGovernment'
								>
									Local Government
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='localGovernment'
									placeholder='Enter your local government'
									{...register('localGovernment')}
								/>
								{errors.localGovernment && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>
						</div>
					</div>

					<h2 className='text-2xl font-bold mt-8  bg-blue-500 text-white p-5 flex items-center justify-between'>
						Other Information
						<AiFillBook />
					</h2>
					{/* Other Information form fields go here */}

					<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
						<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='driverLicenseNumber'
								>
									Driver License Number
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='driverLicenseNumber'
									placeholder='DL1234567'
									{...register('driverLicenseNumber')}
								/>
								{errors.driverLicenseNumber && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='stateOfPlateNumberAllocation'
								>
									State of Plate Number Allocation
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='stateOfPlateNumberAllocation'
									placeholder='Abuja, Lagos etc'
									{...register('stateOfPlateNumberAllocation')}
								/>
								{errors.stateOfPlateNumberAllocation && (
									<span className='text-red-500'>This field is required</span>
								)}
							</div>

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='licenseBearersName'
								>
									License Bearer's Name
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									type='text'
									id='licenseBearersName'
									placeholder='John Doe'
									{...register('licenseBearersName')}
								/>
								{errors.licenseBearersName && (
									<span className='text-red-500'>This field is required</span>
								)}
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
