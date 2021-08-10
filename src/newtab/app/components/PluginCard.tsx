import React, { FC } from 'react';
import { IconButton } from './IconButton';

import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorMessage } from './ErrorMessage';
import axios from 'axios';
import { Icon } from './Icon';
import { plugins } from '../store';

type PluginCardProps = {
	onEdit?: () => void;
	onDelete?: () => void;
	plugin: plugins.Plugin;
};

type PluginCodeInitData = {
	axios: typeof axios;
	render: (template: string) => void;
};

type PluginCodeResponse = {
	init: (props?: any) => void;
};

const PluginCardInner: FC<PluginCardProps> = ({ onEdit, plugin }) => {
	const [renderData, setRenderData] = useState('');
	const [errorRender, setErrorRender] = useState('');

	useEffect(() => {
		try {
			setErrorRender('');
			const code = `
				${plugin.code}
				;return options;
			`;
			const options: PluginCodeResponse = Function(code)();

			const config = {
				axios,
				chrome: chrome,
				render: (template: string) => {
					setRenderData(String(template));
				},
			};
			options.init(config);
		} catch (err) {
			setErrorRender(err.message);
		}
	}, [plugin.code]);

	return (
		<>
			<div className='flex h-full w-full'>
				{errorRender ? (
					<div>
						<ErrorMessage>{errorRender}</ErrorMessage>
					</div>
				) : (
					<div
						className='flex h-full w-full'
						dangerouslySetInnerHTML={{ __html: renderData }}
					></div>
				)}
			</div>
		</>
	);
};

export const PluginCard: FC<PluginCardProps> = (props) => {
	return (
		<div className='p-2 rounded-lg bg-white dark:bg-gray-700 h-full shadow relative group'>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				className='absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-all'
			>
				<IconButton onClick={props.onEdit}>
					<Icon name='dots' />
				</IconButton>
				<IconButton onClick={props.onDelete}>
					<Icon name='x' />
				</IconButton>
			</div>
			<ErrorBoundary>
				<PluginCardInner {...props} />
			</ErrorBoundary>
		</div>
	);
};
