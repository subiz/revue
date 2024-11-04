import lo from 'lodash'

import {css, Convert, createRef, getRef, setEnvWeb} from './lib.js'
import Div from './components/Div/index.js'

import SubCom from './example_sub.js'

class Com {
	static name = 'com'
	static defaultProps = {
		fullname: '',
		now: 0,
		onDoubleClick: () => {},
		ob: {},
	}
	inputRef = createRef(this)
	state = {
		display: false,
		val: 'do',
	}

	constructor() {}

	componentDidMount() {
		setTimeout(() => {
			this.setState({display: true})
		}, 500)
		setTimeout(() => {
			return
			this.inputRef.current.focus()
			// this.$refs["thanh"].focus()
		}, 1000)
		console.log('MOUNT', this.inputRef)
	}

	componentWillUnmount() {
		console.log('DESTROY')
	}

	method1(a, b) {
		console.log('METHOD 1', a, b)
	}

	renderSub() {
		return <div>Sub</div>
	}

	onInput = (e) => {
		this.setState({val: e.target.value})
	}

	renderInput() {
		return <input ref={getRef(this.inputRef)} value={this.state.val} onInput={this.onInput} />
	}

	onClick = (text) => {
		console.log('CLICKED', text)
	}

	render(h) {
		// let h = this.$createElement;
		console.log('RENDER com:', this.onClick)
		return (
			<Div
				hover_style={{background: 'pink', color: 'yellow'}}
				onMouseover={(e) => console.log(e)}
				style={{fontWeight: 'bold'}}
				data-id='kk'
			>
				22222222
			</Div>
		)
		return (
			<Div>
				<p></p>
				<h1 data-id='kk' style='font-weight: bold'>
					22222222 {this.state.val}
				</h1>
				{this.renderInput()}
				<SubCom
					fullname={this.state.val}
					now={Date.now()}
					ob={{fullname: this.state.val}}
					onDoubleClick={this.onClick}
				/>
			</Div>
		)
	}
}
//
// #2340892384:hover {
//   background: 'red';
// }

let style = {
	item: {
		background: 'white',
	},
	item_hover: {
		background: 'red',
	},
}
export default Convert(Com)
