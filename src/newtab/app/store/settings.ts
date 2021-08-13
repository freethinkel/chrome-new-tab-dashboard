import { createStore, update } from 'nanostores';
import { Layout } from 'react-grid-layout';
import { AppStorage } from '../services/storage';

const DEFAULT = {
	name: 'PNP Dashboard',
	layout: [] as Layout[],
	backgroundImage: null as string | null,
};

type Settings = typeof DEFAULT;

export const store = createStore<Settings>(() => {
	try {
		store.set({ ...DEFAULT });
		AppStorage.getItem('settings').then((cached) => {
			setTimeout(() => {
				update(store, (current) => ({
					...DEFAULT,
					...((cached as Partial<Settings>) || {}),
				}));
			});
		});
	} catch (err) {
		store.set({ ...DEFAULT });
	}
});

store.subscribe((value) => {
	AppStorage.setItem('settings', value);
});

export const updateSetting = (data: Partial<Settings>) => {
	update(store, (current) => ({ ...current, ...data }));
};
