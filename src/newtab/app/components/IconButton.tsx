import React, { FC } from 'react';

export const IconButton: FC<{ onClick?: () => void }> = ({
	children,
	onClick,
}) => {
	return (
		<button
			className='w-9 h-9 flex items-center justify-center transition-all rounded-xl hover:bg-opacity-10 hover:bg-gray-900 focus:scale-95 transform'
			type='button'
			onClick={onClick}
		>
			{children}
		</button>
	);
};
