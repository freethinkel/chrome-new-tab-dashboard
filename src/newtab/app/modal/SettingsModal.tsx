import { useStore } from 'nanostores/react';
import React from 'react';
import { useRef } from 'react';
import Button from '../components/Button';
import { ColorPicker } from '../components/ColorPicker';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { ImportExportService } from '../services/export';
import { plugins, settings } from '../store';

export const SettingsModal = () => {
	const settingsStore = useStore(settings.store);
	const pluginsStore = useStore(plugins.store);
	const importExportService = useRef(new ImportExportService());

	const importWidgets = async () => {
		const widgets = await importExportService.current.import();
		plugins.mergePlugins(widgets.widgets);
	};

	return (
		<div className='flex flex-col w-full pb-2 gap-4'>
			<div className='flex justify-between items-end'>
				<div className='flex-grow'>
					<Input
						onChange={(name) => settings.updateSetting({ name })}
						value={settingsStore.name}
						placeholder='Введите название'
						label='Название'
					/>
				</div>
				<div className='pl-2'>
					<ColorPicker
						defaultColor={settingsStore.titleColor}
						onChange={(color) => settings.updateSetting({ titleColor: color })}
					/>
				</div>
			</div>
			<div className=''>
				<Input
					onChange={(url) => settings.updateSetting({ backgroundImage: url })}
					value={settingsStore.backgroundImage || ''}
					placeholder='Введите ссылку на изображение'
					label='Фон'
				/>
			</div>
			<div className=''>
				<Button
					onClick={() =>
						importExportService.current.exportWidgets(pluginsStore)
					}
				>
					<div className='flex gap-2'>
						<Icon name='file-export' />
						Экспорт всех виджетов
					</div>
				</Button>
			</div>
			<div className=''>
				<Button onClick={importWidgets}>
					<div className='flex gap-2'>
						<Icon name='file-import' />
						Импорт виджетов
					</div>
				</Button>
			</div>
		</div>
	);
};
