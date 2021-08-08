import { createStore, update } from 'nanostores';

const DEFAULT = {
	name: 'PNP Dashboard',
};

type Settings = typeof DEFAULT;

export const store = createStore<Settings>(() => {
	let cached = {};
	try {
		cached = JSON.parse(localStorage.getItem('settings') || '{}');
	} catch (err) {}

	store.set({ ...DEFAULT, ...cached });
});

store.subscribe((value) => {
	localStorage.setItem('settings', JSON.stringify(value));
});

export const updateSetting = (data: Partial<Settings>) => {
	update(store, (current) => ({ ...current, ...data }));
};
