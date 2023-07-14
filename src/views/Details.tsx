import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingPage from '../components/LoadingPage';

const Details = () => {
	const [vehicle, setVehicle] = useState<any>(null);
	const { id } = useParams();
	const vehicleId = id || null;

	useEffect(() => {
		if (vehicleId) {
			const dbRef = doc(firestore, 'Vehicles', vehicleId);

			const fetchVehicle = async () => {
				try {
					const vehicleDoc = await getDoc(dbRef);
					if (vehicleDoc.exists()) {
						setVehicle({ id: vehicleDoc.id, data: vehicleDoc.data() });
					} else {
						// Document doesn't exist
						setVehicle(null);
					}
				} catch (error) {
					console.error('Error fetching vehicle:', error);
				}
			};

			fetchVehicle();
		}
		return () => {
			// Cleanup function if needed
		};
	}, [vehicleId]); // Re-run effect when the vehicleId changes

	return <Layout>{vehicle ? 'random code' : <LoadingPage />}</Layout>;
};

export default Details;
