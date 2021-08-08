import { useStore } from 'nanostores/react';
import React from 'react';
import { Input } from '../components/Input';
import { settings } from '../store';

export const SettingsModal = () => {
	const settingsStore = useStore(settings.store);

	return (
		<div className='flex flex-col w-full pb-2'>
			<div className=''>
				<Input
					onChange={(name) => settings.updateSetting({ name })}
					value={settingsStore.name}
					placeholder='Введите название'
					label='Название'
				/>
			</div>
		</div>
	);
};
