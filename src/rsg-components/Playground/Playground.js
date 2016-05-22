import { Component, PropTypes } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';

import s from './Playground.css';

export default class Playground extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
		config: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};

	constructor(props) {
		super();
		this.state = {
			code: props.code,
			config: props.config
		};
	}

	handleChange = (newCode) => {
		this.setState({
			code: newCode
		});
	};

	componentWillReceiveProps(nextProps) {
		let { code, config } = nextProps;
		if (code) {
			this.setState({
				code
			});
		}
		if (config) {
			this.setState({
				config
			});
		}
	}

	render() {
		let { code, config } = this.state;
		let { highlightTheme } = this.props;

		let editor;

		if (config !== 'no-code') {
			editor = <div className={s.editor}>
						<Editor code={code} highlightTheme={highlightTheme} onChange={this.handleChange}/>
					</div>
		}

		return (
			<div className={s.root}>
				<div className={s.preview}>
					<Preview code={code} evalInContext={this.props.evalInContext}/>
				</div>
				{editor}
			</div>
		);
	}
}
