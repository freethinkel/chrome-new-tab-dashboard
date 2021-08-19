import React, { FC, useRef, useState } from 'react';
import Editor from 'react-ace';
import { useStore } from 'nanostores/react';
import { settings } from '../store';
import 'ace-builds/src-noconflict/keybinding-vscode';

import 'ace-builds/src-noconflict/ext-themelist';
import 'ace-builds/src-noconflict/ext-settings_menu';
import 'ace-builds/src-noconflict/ext-whitespace';
import 'ace-builds/src-noconflict/ext-code_lens';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-statusbar';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-options';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-prompt';
import 'ace-builds/src-noconflict/ext-textarea';
import 'ace-builds/src-noconflict/ext-linking';
import 'ace-builds/src-noconflict/ext-emmet';

import 'ace-builds/src-noconflict/mode-javascript';

import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-clouds';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/theme-idle_fingers';
import 'ace-builds/src-noconflict/theme-iplastic';
import 'ace-builds/src-noconflict/theme-katzenmilch';
import 'ace-builds/src-noconflict/theme-kr_theme';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-merbivore_soft';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-pastel_on_dark';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-vibrant_ink';
import 'ace-builds/src-noconflict/theme-xcode';

import { useCallback } from 'react';
import { Select } from '../components/Select';

type CodeEditorProps = {
	code?: string;
	onCodeChanged?: (newCode?: string) => void;
	onSaveCode?: (newCode?: string) => void;
};

const THEMES = [
	'ambiance',
	'chaos',
	'chrome',
	'clouds',
	'clouds_midnight',
	'cobalt',
	'crimson_editor',
	'dawn',
	'dracula',
	'dreamweaver',
	'eclipse',
	'github',
	'gob',
	'gruvbox',
	'idle_fingers',
	'iplastic',
	'katzenmilch',
	'kr_theme',
	'kuroir',
	'merbivore',
	'merbivore_soft',
	'mono_industrial',
	'monokai',
	'nord_dark',
	'pastel_on_dark',
	'solarized_dark',
	'solarized_light',
	'sqlserver',
	'terminal',
	'textmate',
	'tomorrow',
	'tomorrow_night',
	'tomorrow_night_blue',
	'tomorrow_night_bright',
	'tomorrow_night_eighties',
	'twilight',
	'vibrant_ink',
	'xcode',
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
