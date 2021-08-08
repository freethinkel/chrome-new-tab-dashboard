import { nanoid } from 'nanoid';
import { createStore, update } from 'nanostores';

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
	 
	 update(config, render);
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
		const cachedData = JSON.parse(localStorage.getItem('plugins') || '[]');
		store.set(cachedData);
	} catch (err) {
		store.set([]);
	}
});

store.subscribe((data) => {
	localStorage.setItem('plugins', JSON.stringify(data));
});

export const addNewPlugin = (plugin: Plugin) =>
	update(store, (current) => [
		...current,
		{
			...plugin,
			code: DEFAULT_PLUGIN_CODE,
			id: nanoid(),
		},
	]);

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
