import { useStore } from 'nanostores/react';
import React from 'react';
import { useEffect } from 'react';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { modal } from '../store';

export const Modal = () => {
	const modalStore = useStore(modal.store);

	useEffect(() => {
		if (modalStore.enabled) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [modalStore.enabled]);

	if (!modalStore.enabled) {
		return null;
	}

	const sizes = {
		[modal.ModalSize.xs]: 'max-w-xl h-auto',
		[modal.ModalSize.md]: 'max-w-4xl h-full',
		[modal.ModalSize.lg]: 'max-w-full h-full max-h-full',
	};

	return (
		<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 dark:bg-opacity-60 bg-opacity-50 px-2 py-2'>
			<div
				className={`flex flex-col rounded-lg bg-white dark:bg-gray-700 shadow w-full ${
					sizes[modalStore.size] || 'max-w-xl'
				}`}
			>
				<div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-600 px-2 py-2'>
					<h4 className='text-xl font-bold text-gray-800 dark:text-white'>
						{modalStore.name}
					</h4>

					<IconButton onClick={modal.closeModal}>
						<Icon name='x' />
					</IconButton>
				</div>
				<div className='flex flex-1 px-2 py-2'>{modalStore.component}</div>
			</div>
		</div>
	);
};
