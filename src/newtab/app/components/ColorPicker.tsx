import React, { useState } from 'react';
import { Icon } from './Icon';

type ColorPickerProps = {
	onChange: (color: string) => void;
	defaultColor?: string;
};

export const ColorPicker = (props: ColorPickerProps) => {
	const [color, setColor] = useState(props.defaultColor || '#fff');
	return (
		<label className='cursor-pointer'>
			<input
				onChange={(e) => {
					setColor(e.target.value);
					props.onChange(e.target.value);
				}}
				className='invisible absolute opacity-0'
				type='color'
			/>
			<div
				className='h-8 w-8 border border-gray-400 rounded-lg'
				style={{ backgroundColor: color }}
			></div>
		</label>
	);
};
