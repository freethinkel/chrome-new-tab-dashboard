import React from 'react';
import { ErrorMessage } from './ErrorMessage';

export class ErrorBoundary extends React.Component {
	state = { hasError: false, errorMessage: '' };

	constructor(props: any) {
		super(props);
	}

	static getDerivedStateFromError(error: any) {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
		return { hasError: true };
	}

	componentWillReceiveProps() {
		this.setState({ ...this.state, hasError: false });
	}

	componentDidCatch(error: any, errorInfo: any) {
		// Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
		this.setState({
			...this.state,
			errorMessage: error.message,
		});
	}

	render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return <ErrorMessage>{this.state.errorMessage}</ErrorMessage>;
		}

		return this.props.children;
	}
}
