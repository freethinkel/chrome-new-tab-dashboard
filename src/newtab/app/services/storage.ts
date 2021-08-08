class AppStorage {
	public static getItem<T>(key: string): Promise<T> {
		return new Promise((rslv, rjct) => {
			chrome?.storage?.get(key, (data: any) => {
				try {
					rslv(JSON.parse(data));
				} catch (err) {
					rjct(err);
				}
			});
		});
	}

	public static setItem(key: string, value: any): Promise<any> {
		return new Promise((rslv, rjct) => {
			chrome?.storage.set(
				{
					[key]: JSON.stringify(value),
				},
				() => {
					rslv(undefined);
				}
			);
		});
	}
}
