import React from 'react';
import { UserButton, useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
const Layout = ({ children }: any) => {
	const { isSignedIn } = useAuth();
	return (
		<div className='max-w-7xl mx-auto px-2'>
			<div className='flex justify-between items-center my-5 '>
				<Link to='/' className='mb-4 text-2xl font-bold text-center'>
					<span className='text-blue-500 font-extrabold'>Regi</span>
					<span className='text-red-500 font-extrabold italic'>Auto</span>
				</Link>
				<div className=''>{isSignedIn && <UserButton />}</div>
			</div>
			{children}
		</div>
	);
};

export default Layout;
