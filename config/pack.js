const fs = require('fs');
const path = require('path');

const ChromeExtension = require('crx');
const crx = new ChromeExtension({
	privateKey: fs.readFileSync(path.resolve(__dirname, '../keys/dist.pem')),
});

const getExtName = () =>
	new Promise((rslv, rjct) => {
		fs.readFile(path.resolve(__dirname, '../package.json'), (err, data) => {
			if (err) {
				rjct(err);
			} else {
				try {
					const json = JSON.parse(data + '');
					rslv(json.name.trim().split(/ +/).join('-'));
				} catch (err) {
					rjct(err);
				}
			}
		});
	});

console.log(__dirname);

crx
	.load(path.resolve(__dirname, '../dist'))
	.then((crx) => crx.pack())
	.then(async (crxBuffer) => {
		fs.writeFileSync(
			path.resolve(__dirname, `../dist/${await getExtName()}.crx`),
			crxBuffer
		);
	})
	.catch((err) => {
		console.error(err);
	});
