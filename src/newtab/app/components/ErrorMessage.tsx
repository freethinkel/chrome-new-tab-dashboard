import React, { FC } from 'react';

export const ErrorMessage: FC = ({ children }) => {
	return (
		<div className='text-white flex row bg-red-700 px-2 py-2 rounded-md'>
			{children}
		</div>
	);
};
