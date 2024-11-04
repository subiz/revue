import {Convert} from '../../lib.js'
class Div {
	static name = 'Div'
	render() {
		return <div {...this.props}>{this.props.children}</div>
	}
}

export default Convert(Div)
