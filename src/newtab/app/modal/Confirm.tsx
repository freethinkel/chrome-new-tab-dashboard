import React, { FC } from 'react';
import Button from '../components/Button';

type ConfirmPopupProps = {
	title?: string;
	onResolve?: () => void;
	onReject?: () => void;
};

export const ConfirmPopup: FC<ConfirmPopupProps> = ({
	onResolve,
	onReject,
}) => {
	return (
		<div className='w-full'>
			<div className='flex gap-2 w-full'>
				<div className='flex-grow'>
					<Button onClick={onResolve} className='w-full bg-red-500'>
						Да
					</Button>
				</div>
				<div className='flex-grow'>
					<Button onClick={onReject} className='w-full bg-green-500'>
						Нет
					</Button>
				</div>
			</div>
		</div>
	);
};
