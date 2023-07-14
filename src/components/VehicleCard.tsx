import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle, id }: any) => {
	const navigate = useNavigate();

	const openDetails = (id: string) => {
		navigate(`/details/${id}`);
	};
	return (
		<div className='bg-white shadow-lg rounded-lg p-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>
					{vehicle.firstName} {vehicle.lastName}
				</h2>
				<span className='text-gray-500'>
					{vehicle.ownerIdentification}:{vehicle.identificationNo}
				</span>
			</div>
			<div className='mt-4'>
				<p className='text-gray-700'>
					{vehicle.vehicleMake} {vehicle.model}
				</p>
			</div>
			<div className='mt-6 flex justify-between items-center'>
				<span className='text-indigo-600 font-medium'>
					{vehicle.engineNumber}
				</span>
				<button
					className='bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300'
					onClick={() => openDetails(id)}
				>
					View Details
				</button>
			</div>
		</div>
	);
};

export default VehicleCard;
