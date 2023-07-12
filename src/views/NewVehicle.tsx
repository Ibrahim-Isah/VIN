import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const NewVehicle = () => {
	const { userId, isSignedIn, isLoaded, signOut } = useAuth();
	const navigate = useNavigate();

	if (isLoaded && !isSignedIn) {
		navigate('/sign-in');
	}
	return <Layout>NewVehicle {userId}</Layout>;
};

export default NewVehicle;
