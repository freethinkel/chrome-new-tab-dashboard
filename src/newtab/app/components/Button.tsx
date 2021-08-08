import React, { FC } from 'react';

const Button: FC = ({ children }) => {
	return (
		<button
			type='button'
			className='flex items-center justify-center text-white bg-gray-800 h-10 rounded-lg px-3 font-bold text-base'
		


		>
			{children}
		</button>
	);
};

export default Button;
