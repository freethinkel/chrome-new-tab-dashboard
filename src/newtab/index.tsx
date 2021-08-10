import React from 'react';
import { render } from 'react-dom';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import './styles.css';

import { Dashboard } from './app/HOC/Dashboard';

async function main() {
	const root = document.querySelector('#root');
	render(<Dashboard />, root);
}

main();

if ((module as any)['hot']) {
	(module as any)['hot'].accept();
}
