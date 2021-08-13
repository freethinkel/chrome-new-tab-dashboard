import { Plugin } from '../store/plugins';

const FILE_EXTENSION = 'wdgt';
const FILE_NAME = 'export_widgets';

export type WidgetsExportModel = {
	timestamp: number;
	widgets: Plugin[];
};

export class ImportExportService {
	async import(): Promise<WidgetsExportModel> {
		return new Promise((rslv, rjct) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', `.${FILE_EXTENSION}`);
			input.onchange = () => {
				const file = input.files?.[0];
				if (file) {
					const reader = new FileReader();
					reader.readAsText(file);
					reader.onerror = rjct;
					reader.onload = () => {
						const { result } = reader;
						try {
							rslv(JSON.parse(String(result)) as WidgetsExportModel);
						} catch (err) {
							rjct(err);
						}
					};
				} else {
					rjct(new Error('No files'));
				}
			};
			input.click();
		});
	}

	async exportWidgets(widgets: readonly Plugin[]): Promise<any> {
		const exportModel: WidgetsExportModel = {
			timestamp: Date.now(),
			widgets: widgets as Plugin[],
		};

		this.downloadFile(
			`${FILE_NAME}.${FILE_EXTENSION}`,
			JSON.stringify(exportModel)
		);
	}

	private downloadFile(filename: string, data: string): void {
		const link = document.createElement('a');
		link.download = filename;
		link.href = window.URL.createObjectURL(new Blob([data]));
		link.click();
	}
}
