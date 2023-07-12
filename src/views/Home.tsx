import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center h-screen bg-backImage bg-no-repeat bg-cover bg-gray-100'>
				<div className='max-w-md px-6 py-8 mx-2 bg-white rounded-lg shadow-lg'>
					<h2 className='mb-4 text-2xl font-bold text-center'>
						Vehicle Licensing System
					</h2>
					<p className='text-gray-700'>
						Welcome to our Vehicle Registration/Licensing service. Register your
						vehicle today to enjoy exclusive benefits and access to various
						features.
					</p>
					<Link to='/new'>
						<button className='w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'>
							Register Vehicle
						</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
