import React, { FC, useRef, useState } from 'react';
import Editor from 'react-ace';
import { useStore } from 'nanostores/react';
import { settings } from '../store';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-kuroir';
import { useCallback } from 'react';
import { Icon } from '../components/Icon';
import { Select } from '../components/Select';

type CodeEditorProps = {
	code?: string;
	onCodeChanged?: (newCode?: string) => void;
	onSaveCode?: (newCode?: string) => void;
};

const THEMES = [
	'github',
	'dracula',
	'gruvbox',
	'solarized_dark',
	'solarized_light',
	'monokai',
	'xcode',
	'kuroir',
].map((t) => ({ title: t[0].toUpperCase() + t.substring(1), value: t }));

export const CodeEditor: FC<CodeEditorProps> = ({
	code,
	onCodeChanged,
	onSaveCode,
}) => {
	const [editorCode, setCode] = useState(code + '');
	const [notSaved, setNotSaves] = useState(true);
	const settingsStore = useStore(settings.store);

	const saveCode = useCallback((code) => {
		if (onSaveCode) {
			setNotSaves(true);
			onSaveCode(code);
		}
	}, []);

	const commands = [
		{
			name: 'save',
			bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
			exec: (editor: any) => {
				saveCode(editor.getValue());
			},
		},
	];

	return (
		<div className='h-full flex flex-col'>
			<div className='pb-2 flex gap-2'>
				<button
					onClick={() => saveCode(editorCode)}
					className='bg-white rounded-md px-2 py-1 text-gray-900 text-xs font-bold disabled:opacity-60'
					disabled={notSaved}
				>
					Сохранить
				</button>

				<Select
					value={settingsStore.codeEditorSettings.theme}
					options={THEMES}
					onSelect={(value) =>
						settings.updateSetting({
							codeEditorSettings: {
								...settingsStore.codeEditorSettings,
								theme: value,
							},
						})
					}
					placeholder='Regular input'
				/>
			</div>
			<div className='flex-grow'>
				<Editor
					width='100%'
					height='100%'
					theme={settingsStore.codeEditorSettings.theme}
					mode='javascript'
					tabSize={2}
					value={editorCode + ''}
					enableBasicAutocompletion
					enableLiveAutocompletion
					commands={commands}
					onChange={(newCode: string) => {
						setCode(newCode + '');
						setNotSaves(false);
						if (onCodeChanged) {
							onCodeChanged(newCode);
						}
					}}
				/>
			</div>
		</div>
	);
};
