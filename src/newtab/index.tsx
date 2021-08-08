import React from 'react';
import { render } from 'react-dom';
import './styles.css';

import View from './app/View';

async function main() {
	const root = document.querySelector('#root');
	render(<View />, root);
}

main();

if ((module as any)['hot']) {
	(module as any)['hot'].accept();
}
