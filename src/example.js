import lo from 'lodash'
import {css, Convert, createRef, getRef} from './lib.js'
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
		if (!this.state.display) return null
		return <input ref={getRef(this.inputRef)} value={this.state.val} onInput={this.onInput} />
	}

	onClick = (text) => {
		console.log('CLICKED', text)
	}

	render(h) {
		// let h = this.$createElement;
		console.log('RENDER com:', this.onClick)
		return (
			<div>
				<p></p>
				<h1>22222222 {this.state.val}</h1>
				{this.renderInput()}
				<SubCom
					fullname={this.state.val}
					now={Date.now()}
					ob={{fullname: this.state.val}}
					onDoubleClick={this.onClick}
				/>
			</div>
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

/*
export default {
  created() {
    com.$createElement = this.$createElement;
  },
  methods: {
    renderA() {
      return <div>AA</div>;
    },
  },
  render() {
    return (
      <div>
        {this.renderA()}
        thanh{com.render(this.$createElement)}
        <div>--------------</div>
      </div>
    );
  },
};
*/
