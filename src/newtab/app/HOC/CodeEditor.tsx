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
	'theme-ambiance',
	'theme-chaos',
	'theme-chrome',
	'theme-clouds',
	'theme-clouds_midnight',
	'theme-cobalt',
	'theme-crimson_editor',
	'theme-dawn',
	'theme-dracula',
	'theme-dreamweaver',
	'theme-eclipse',
	'theme-github',
	'theme-gob',
	'theme-gruvbox',
	'theme-idle_fingers',
	'theme-iplastic',
	'theme-katzenmilch',
	'theme-kr_theme',
	'theme-kuroir',
	'theme-merbivore',
	'theme-merbivore_soft',
	'theme-mono_industrial',
	'theme-monokai',
	'theme-nord_dark',
	'theme-pastel_on_dark',
	'theme-solarized_dark',
	'theme-solarized_light',
	'theme-sqlserver',
	'theme-terminal',
	'theme-textmate',
	'theme-tomorrow',
	'theme-tomorrow_night',
	'theme-tomorrow_night_blue',
	'theme-tomorrow_night_bright',
	'theme-tomorrow_night_eighties',
	'theme-twilight',
	'theme-vibrant_ink',
	'theme-xcode',
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
