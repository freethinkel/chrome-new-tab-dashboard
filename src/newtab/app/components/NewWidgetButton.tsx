import React, { FC } from 'react';

type NewWidgetButtonProps = {
	onClick?: () => void;
};

export const NewWidgetButton: FC<NewWidgetButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			type='button'
			className='bg-white dark:bg-gray-700 rounded-lg p-2 h-72 shadow flex items-center justify-center w-full transition-all transform hover:scale-95'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-12 w-12'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 4v16m8-8H4'
				/>
			</svg>
		</button>
	);
};
