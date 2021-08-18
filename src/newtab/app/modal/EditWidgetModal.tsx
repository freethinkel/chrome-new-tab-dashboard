import React, { FC } from 'react';
import { plugins } from '../store';
import { CodeEditor } from '../HOC/CodeEditor';
import { PluginCard } from '../components/PluginCard';
import { useState } from 'react';

type EditWidgetModalProps = {
	plugin?: plugins.Plugin;
};

export const EditWidgetModal: FC<EditWidgetModalProps> = ({ plugin }) => {
	const [newCode, setNewCode] = useState(plugin?.code);
	const code = plugin?.code;

	return (
		<div className='w-full h-full'>
			<div className='flex h-full items-start'>
				<div className='flex-grow h-full'>
					<CodeEditor
						code={code}
						onSaveCode={(newCode) => {
							setNewCode(newCode);
							plugins.updatePlugin(plugin!.id!, { code: newCode });
						}}
					/>
				</div>
				<div className='max-w-md w-full border-gray-500 border ml-4 rounded-md mt-8 h-80'>
					<PluginCard plugin={{ ...plugin!, code: newCode }} />
				</div>
			</div>
		</div>
	);
};
