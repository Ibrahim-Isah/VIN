import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingPage from '../components/LoadingPage';
import { AiFillCar, AiFillBook } from 'react-icons/ai';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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

	return (
		<Layout>
			<header className='flex items-center my-10 justify-between py-4 px-6 border border-gray-300 rounded-lg'>
				<h1 className='text-xl font-semibold mr-auto'>Vehicle Detail</h1>
				<div className='sm:space-x-4 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0'>
					<Link to='/vehicles'>
						<button className='bg-transparent hover:bg-blue-600 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded border border-blue-600 hover:border-transparent'>
							All Vehicles
						</button>
					</Link>
					<Link to='/new'>
						<button className='bg-blue-500 self-start hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
							Add New Vehicle
						</button>
					</Link>
				</div>
			</header>
			<div className='flex items-center my-3 py-2 px-6 border border-gray-300 rounded-lg'>
				<span className='font-semibold text-xl'>Plate Number:</span>{' '}
				<span className='font-bold text-blue-500 text-xl'>
					{vehicle?.data?.plateNumber}
				</span>
			</div>
			{vehicle ? (
				vehicle.data && <VehicleDetail vehicle={vehicle.data} />
			) : (
				<LoadingPage />
			)}
		</Layout>
	);
};

export default Details;

const VehicleDetail = ({ vehicle }: any) => {
	return (
		<div>
			<h2 className='text-2xl font-bold bg-blue-500 text-white py-3 px-5 flex items-center justify-between'>
				Vehicle Information
				<AiFillCar />
			</h2>
			{/* Vehicle Information messages go here */}
			<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Vehicle Category
					</p>
					<p className='text-gray-700'>{vehicle?.vehicleCategory}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Vehicle Sub-Category
					</p>
					<p className='text-gray-700'>{vehicle?.vehicleSubCategory}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>Model</p>
					<p className='text-gray-700'>{vehicle?.model}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Old Plate Number
					</p>
					<p className='text-gray-700'>{vehicle?.oldPlateNumber}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Engine Number
					</p>
					<p className='text-gray-700'>{vehicle?.engineNumber}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Policy Number
					</p>
					<p className='text-gray-700'>{vehicle?.policyNumber}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Vehicle Make
					</p>
					<p className='text-gray-700'>{vehicle?.vehicleMake}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Vehicle Type
					</p>
					<p className='text-gray-700'>{vehicle?.vehicleType}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Chassis No
					</p>
					<p className='text-gray-700'>{vehicle?.chassisNo}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Fuel Type
					</p>
					<p className='text-gray-700'>{vehicle?.fuelType}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Year of Manufacture
					</p>
					<p className='text-gray-700'>{vehicle?.yearOfManufacture}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>Odometer</p>
					<p className='text-gray-700'>{vehicle?.odometer} km</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Tank Capacity
					</p>
					<p className='text-gray-700'>{vehicle?.tankCapacity} liters</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>
						Engine Capacity
					</p>
					<p className='text-gray-700'>{vehicle?.engineCapacity}</p>
				</div>

				<div className='mb-4'>
					<p className='block text-gray-700 text-sm font-bold mb-2'>Color</p>
					<p className='text-gray-700'>{vehicle?.color}</p>
				</div>
			</div>
			<h2 className='text-2xl font-bold mt-8 bg-blue-500 text-white py-3 px-5 flex items-center justify-between'>
				Owner's Information
				<BiSolidUserRectangle />
			</h2>
			{/* Owner's Information messages go here */}
			<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
				<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Owner Identification
						</p>
						<p className='text-gray-700'>{vehicle?.ownerIdentification}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Address
						</p>
						<p className='text-gray-700'>{vehicle?.address}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>Title</p>
						<p className='text-gray-700'>{vehicle?.title}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>City</p>
						<p className='text-gray-700'>{vehicle?.city}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Mobile Number
						</p>
						<p className='text-gray-700'>{vehicle?.mobileNumber}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							First Name
						</p>
						<p className='text-gray-700'>{vehicle?.firstName}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Last Name
						</p>
						<p className='text-gray-700'>{vehicle?.lastName}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Identification No
						</p>
						<p className='text-gray-700'>{vehicle?.identificationNo}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>Email</p>
						<p className='text-gray-700'>{vehicle?.email}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>State</p>
						<p className='text-gray-700'>{vehicle?.state}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Local Government
						</p>
						<p className='text-gray-700'>{vehicle?.localGovernment}</p>
					</div>
				</div>
			</div>
			<h2 className='text-2xl font-bold mt-8 bg-blue-500 text-white py-3 px-5 flex items-center justify-between'>
				Other Information
				<AiFillBook />
			</h2>
			{/* Other Information messages go here */}
			<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5'>
				<div className='shadow-sm bg-[#f5f5f5] mb-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							Driver License Number
						</p>
						<p className='text-gray-700'>{vehicle?.driverLicenseNumber}</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							State of Plate Number Allocation
						</p>
						<p className='text-gray-700'>
							{vehicle?.stateOfPlateNumberAllocation}
						</p>
					</div>

					<div className='mb-4'>
						<p className='block text-gray-700 text-sm font-bold mb-2'>
							License Bearer's Name
						</p>
						<p className='text-gray-700'>{vehicle?.licenseBearer}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
