# Chrome dashboard new tab plugin

![Screenshot](/screenshots/dashboard.png)

This extension uses the following permissions:

- `storage`,
- `topSites`,
- `system.cpu",
- `system.memory",
- `system.storage",
- `power`,
- `tts`,
- `ttsEngine`,
- `geolocation`,
- `history`,
- `downloads`,
- `bookmarks`,
- `alarms`,
- `activeTab`,
- `*://*/*`

### How to use?

Since the extension is not published in the chrome store, you must enable developer mode in `chrome://extensions/` and select **"Load unpacked extension"**, then specify the path to the `dist` folder

### Project setup

```
yarn install
```

### Development

```
yarn dev
```

### Build

```
yarn build
```

### pack to .crx

```
yarn crx
```
