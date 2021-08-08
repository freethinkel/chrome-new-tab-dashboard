import React from 'react';
import { FC } from 'react';

type InputProps = {
	label?: string;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
};

export const Input: FC<InputProps> = ({
	placeholder,
	label,
	onChange,
	value,
}) => {
	return (
		<label className='flex flex-col'>
			<span className='text-xs font-bold text-gray-700 dark:text-white'>
				{label}
			</span>
			<input
				onChange={(e) => onChange && onChange(e.target.value)}
				className='rounded-lg shadow-sm px-2 py-1 outline-none focus:border-yellow-500 bg-white dark:bg-gray-500 dark:border-gray-400 border border-gray-200'
				type='text'
				value={value}
				placeholder={placeholder}
			/>
		</label>
	);
};
