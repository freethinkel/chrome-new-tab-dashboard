import { nanoid } from 'nanoid';
import { createStore, update } from 'nanostores';
import { settings } from '.';
import { AppStorage } from '../services/storage';

const DEFAULT_PLUGIN_CODE = `
const state = {
	message: 'Hello' 
 }
 
 const update = (config, render) => {
	 config.axios.get('https://example.com')
	 .then(res => {
		 state.message = res.data || 'Hello'
		 render()
	 })
 }

 /* config = {...}
 	{
		 axios: Axios - http client
		 render: render template callback -> innerHTML to Widget
		 chrome: instance - Chrome class
	 }
 */
 
 const init = (config) => {
	 const render = () => config.render(\`
	 <div class="text-center text-xl font-bold flex items-center justify-center w-full h-full ">
		 \${state.message || 'Загрузка...'}
	 </div>
	 \`)
	 
	 // update(config, render);
	 render()
 }
 
 const options = {
	 init
 }
`;

export type Plugin = {
	name: string;
	code?: string;
	id?: string;
};

export const store = createStore<Plugin[]>(() => {
	try {
		store.set([]);
		AppStorage.getItem('plugins').then((cachedData) => {
			setTimeout(() => {
				update(store, (current) => [...((cachedData as Plugin[]) || [])]);
			});
		});
	} catch (err) {
		console.log(err);
		store.set([]);
	}
});

store.subscribe((data) => {
	AppStorage.setItem('plugins', data);
});

export const addNewPlugin = (plugin: Plugin) => {
	const pluginId = nanoid();
	update(settings.store, (current) => {
		return {
			...current,
			layout: [
				...(current.layout || []),
				{
					w: 4,
					h: 2,
					y: 0,
					x: current.layout.length * 4,
					i: pluginId,
					minH: 1,
				},
			],
		};
	});
	update(store, (current) => [
		...current,
		{
			...plugin,
			code: DEFAULT_PLUGIN_CODE,
			id: pluginId,
		},
	]);
};

export const updatePlugin = (id: string, payload: Partial<Plugin>) => {
	update(store, (current) =>
		current.map((plugin) =>
			plugin.id === id ? { ...plugin, ...payload } : plugin
		)
	);
};

export const deletePlugin = (id: string) => {
	update(store, (current) => current.filter((plugin) => plugin.id !== id));
};
