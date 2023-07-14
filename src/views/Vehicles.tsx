import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Layout from '../components/Layout';
import VehicleCard from '../components/VehicleCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LoadingPage from '../components/LoadingPage';

const Vehicles = () => {
	const navigate = useNavigate();
	const { userId, isSignedIn, isLoaded } = useAuth();

	const [allVehicles, setAllVehicles] = useState([]);

	useEffect(() => {
		if (isLoaded) {
			!isSignedIn && navigate('/sign-in/*');
			console.log(userId, isSignedIn);
		}
	}, []);

	useEffect(() => {
		const dbRef = collection(firestore, 'Vehicles');
		const unsubscribe = onSnapshot(dbRef, (snapshot) => {
			const docs: any = snapshot.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}));
			setAllVehicles(docs);
		});

		return () => {
			unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
		};
	}, []); // Empty dependency array to run the effect only once on component mount

	return (
		<Layout>
			<div className='container mx-auto py-8'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-4xl font-semibold'>Licensed Vehicle List</h1>
					<button
						className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
						onClick={() => navigate('/new')}
					>
						Add New Vehicle
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{allVehicles ? (
						allVehicles.map((vehicle: any, index: number) => (
							<VehicleCard key={index} vehicle={vehicle.data} id={vehicle.id} />
						))
					) : (
						<LoadingPage />
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Vehicles;
