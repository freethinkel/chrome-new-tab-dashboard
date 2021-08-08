import React, { FC } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import { plugins } from '../store';

type EditWidgetModalProps = {
	plugin?: plugins.Plugin;
};

export const EditWidgetModal: FC<EditWidgetModalProps> = ({ plugin }) => {
	const code = plugin?.code;

	return (
		<div className='w-full h-full'>
			<AceEditor
				mode='javascript'
				theme='dracula'
				value={code}
				tabSize={2}
				width='100%'
				height='100%'
				onChange={(newCode) => {
					plugins.updatePlugin(plugin!.id!, { code: newCode });
				}}
			/>
		</div>
	);
};
