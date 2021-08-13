import { nanoid } from 'nanoid';
import { createStore, update } from 'nanostores';
import { Layout } from 'react-grid-layout';
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
		store.set([]);
	}
});

store.subscribe((data) => {
	AppStorage.setItem('plugins', data);
});

const createLayout = (
	id: string,
	{ x, y, layout }: { x?: number; y?: number; layout: Layout[] }
) => {
	return {
		w: 4,
		h: 2,
		y: y || Math.max(...layout.map((l) => l.y)) + 1,
		x: (x || 0) * 4,
		i: id,
		minH: 1,
	};
};

export const mergePlugins = (plugins: Plugin[]) => {
	const _plugins = plugins.map((p) => ({ ...p, id: nanoid() }));
	update(settings.store, (current) => {
		return {
			...current,
			layout: [
				...(current.layout || []),
				..._plugins.map((p, i) =>
					createLayout(p.id, { layout: current.layout })
				),
			],
		};
	});
	update(store, (current) => [...current, ..._plugins]);
};

export const addNewPlugin = (plugin: Plugin) => {
	const pluginId = nanoid();
	update(settings.store, (current) => {
		return {
			...current,
			layout: [
				...(current.layout || []),
				createLayout(pluginId, { layout: current.layout }),
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
