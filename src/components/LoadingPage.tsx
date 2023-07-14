import React from 'react';

const LoadingPage = () => {
	return (
		<div className='flex items-center justify-center h-[50vh]'>
			<svg
				className='animate-spin h-12 w-12 text-indigo-600'
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
			>
				<circle
					className='opacity-25'
					cx='12'
					cy='12'
					r='10'
					stroke='currentColor'
					strokeWidth='4'
				></circle>
				<path
					className='opacity-75'
					fill='currentColor'
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c2.21 0 4-1.79 4-4h-4v4zm5.938-3c1.865-2.114 3-4.896 3-7.938h-4c0 1.77-.716 3.365-1.879 4.529l2.879 3.409z'
				></path>
			</svg>
		</div>
	);
};

export default LoadingPage;
