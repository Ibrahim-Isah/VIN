import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { notifySuccess } from '../utils/notification';

const Home = () => {
	return (
		<Layout>
			{/* <div className='flex flex-col items-center justify-center h-screen bg-backImage bg-no-repeat bg-cover bg-gray-100'>
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
			</div> */}
			<div className='flex flex-col items-center justify-center   bg-gray-100'>
				<div className='min-h-screen flex justify-center items-center bg-backImage bg-no-repeat w-screen bg-cover'>
					<div className='max-w-3xl px-6 py-8 mx-2 bg-white rounded-lg shadow-lg'>
						<h2 className='mb-4 text-4xl font-bold text-center'>
							Vehicle Licensing System
						</h2>
						<p className='text-gray-700 mb-6'>
							Welcome to the Vehicle Licensing System. We are dedicated to
							ensuring safe and legal operation of vehicles on the roads.
							Register your vehicle today and enjoy the benefits of a licensed
							vehicle.
						</p>
						<div className='flex flex-col space-y-4'>
							<Link to='/new'>
								<button className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none'>
									Register Vehicle
								</button>
							</Link>
							<Link to='/vehicles'>
								<button className='w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none'>
									View All Licensed Vehicles
								</button>
							</Link>
						</div>
					</div>
				</div>

				<div className='max-w-3xl mt-8'>
					<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
						<h3 className='text-2xl font-bold mb-4'>
							Why License Your Vehicle?
						</h3>
						<ul className='list-disc list-inside'>
							<li className='text-gray-700 mb-2'>
								Ensure legal compliance and avoid penalties.
							</li>
							<li className='text-gray-700 mb-2'>
								Protect yourself and others by having proper documentation.
							</li>
							<li className='text-gray-700 mb-2'>
								Access special benefits and discounts.
							</li>
							<li className='text-gray-700 mb-2'>
								Enable easy identification and tracking of your vehicle.
							</li>
						</ul>
					</div>

					<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
						<h3 className='text-2xl font-bold mb-4'>Our Services</h3>
						<ul className='list-disc list-inside'>
							<li className='text-gray-700 mb-2'>
								Vehicle registration and licensing
							</li>
							<li className='text-gray-700 mb-2'>
								Renewal of vehicle licenses
							</li>
							<li className='text-gray-700 mb-2'>
								Issuance of special license plates
							</li>
							<li className='text-gray-700 mb-2'>
								Vehicle inspection and compliance checks
							</li>
						</ul>
					</div>

					<div className='bg-white rounded-lg shadow-lg p-6'>
						<h3 className='text-2xl font-bold mb-4'>Contact Us</h3>
						<p className='text-gray-700'>
							If you have any inquiries or require assistance, please feel free
							to contact our customer service team. We are here to help!
						</p>
						<div className='mt-6'>
							<p className='text-gray-700 font-bold'>Phone: </p>
							<p className='text-gray-700'>123-456-7890</p>
						</div>
						<div className='mt-4'>
							<p className='text-gray-700 font-bold'>Email: </p>
							<p className='text-gray-700'>info@licensingorg.com</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
