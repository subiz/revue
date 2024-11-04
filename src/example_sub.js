import lo from 'lodash'
import {Convert, createRef, getRef} from './lib.js'

class ComSub {
	static name = 'com_sub'
	static defaultProps = {
		fullname: null,
		now: null,
		onDoubleClick: null,
		ob: null,
	}

	static watch = {
		fullname(n, o) {
			console.log('FULLNAME CHANGED', n, o)
		},
	}

	componentDidMount() {
		this.intev = setInterval(() => {
			this.thro('a-----------')
		}, 200)
	}

	componentWillUnmount() {
		this.clearInterval(this.intev)
		console.log('DESTROY')
	}

	thro = lo.throttle((a) => {}, 1000)

	method1(a, b) {
		console.log('METHOD 1', a, b)
	}

	method1 = (a, b) => {
		console.log('METHOD 1', a, b, this)
	}

	render() {
		console.log('RENDER CHILD')
		// let h = this.$createElement;
		let f = ''
		if (this.props.ob) f = this.props.ob.fullname || '-'
		return (
			<div>
				CHILD {this.props.fullname}.{this.props.now} {f}
			</div>
		)
	}
}

export default Convert(ComSub)
