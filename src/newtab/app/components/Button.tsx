import React, { FC } from 'react';

type ButtonProps = {
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ children, onClick }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className='flex items-center justify-center text-white bg-gray-800 h-10 rounded-lg px-3 font-bold text-base transform hover:shadow-sm focus:scale-95 transition-all'
		>
			{children}
		</button>
	);
};

export default Button;
