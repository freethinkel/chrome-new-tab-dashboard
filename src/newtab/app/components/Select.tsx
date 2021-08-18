import React, { FC } from 'react';
import { Icon } from './Icon';

type SelectProps = {
	options: { title: string; value: any }[];
	onSelect: (value: any) => void;
	value: any;
	placeholder?: string;
};

export const Select: FC<SelectProps> = ({
	options,
	onSelect,
	value,
	placeholder,
}) => {
	return (
		<div className='relative rounded-md bg-white flex cursor-pointer'>
			<div className='absolute border border-white top-0 right-1 h-4 text-gray-900'>
				<Icon name='chevron-down' />
			</div>
			<select
				placeholder={placeholder}
				onChange={(e) => onSelect(e.target.value)}
				value={value}
				className='cursor-pointer pl-3 pr-8 outline-none py-1 border-none bg-transparent placeholder-gray-600 border appearance-none text-gray-900 text-xs font-bold'
			>
				{options.map((op) => (
					<option key={op.value} value={op.value}>
						{op.title}
					</option>
				))}
			</select>
		</div>
	);
};
