export class AppStorage {
	public static getItem<T>(key: string): Promise<T> {
		return new Promise((rslv, rjct) => {
			if (chrome?.storage) {
				chrome.storage.sync.get(key, (data: any) => {
					try {
						rslv(JSON.parse(data[key]));
					} catch (err) {
						rjct(err);
					}
				});
			} else {
				try {
					rslv(JSON.parse(localStorage.getItem(key) || '""'));
				} catch (err) {
					rjct(err);
				}
			}
		});
	}

	public static setItem(key: string, value: any): Promise<any> {
		return new Promise((rslv, rjct) => {
			if (chrome?.storage) {
				chrome.storage.sync.set(
					{
						[key]: JSON.stringify(value),
					},
					() => {
						rslv(undefined);
					}
				);
			} else {
				try {
					localStorage.setItem(key, JSON.stringify(value));
					rslv(undefined);
				} catch (err) {
					rjct(err);
				}
			}
		});
	}
}
