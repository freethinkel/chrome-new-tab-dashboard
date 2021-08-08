import React, { FC } from 'react';
import { useStore } from 'nanostores/react';
import { PluginCard } from './components/PluginCard';
import { NewWidgetButton } from './components/NewWidgetButton';
import { plugins, modal, settings } from './store';
import { IconButton } from './components/IconButton';
import { Modal } from './modal/Modal';
import { EditWidgetModal } from './modal/EditWidgetModal';
import { Icon } from './components/Icon';
import { SettingsModal } from './modal/SettingsModal';

const View: FC = () => {
	const allPlugins = useStore(plugins.store);
	const settingsStore = useStore(settings.store);
	return (
		<>
			<div className='px-4 py-6'>
				<div className='container mx-auto'>
					<div className='flex justify-between mb-3'>
						<h1 className='text-3xl font-black'>{settingsStore.name}</h1>
						<div className='flex'>
							<IconButton
								onClick={() =>
									modal.openModal({
										component: <SettingsModal />,
										name: 'Настройки',
										size: modal.ModalSize.xs,
									})
								}
							>
								<Icon name='settings' />
							</IconButton>
						</div>
					</div>
					<div className='flex flex-wrap -mx-1'>
						{allPlugins.map((plugin) => (
							<div className='w-1/3 px-1 pt-2' key={plugin.id}>
								<PluginCard
									plugin={plugin}
									onDelete={() => plugins.deletePlugin(plugin.id!)}
									onEdit={() =>
										modal.openModal({
											component: <EditWidgetModal plugin={plugin} />,
											name: 'Редактирование виджета',
											size: modal.ModalSize.md,
										})
									}
								/>
							</div>
						))}
						<div className='w-1/3 px-1 pt-2'>
							<NewWidgetButton
								onClick={() => plugins.addNewPlugin({ name: 'test' })}
							/>
						</div>
					</div>
				</div>
			</div>
			<Modal />
		</>
	);
};

export default View;
