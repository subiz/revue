import {Convert} from '../../lib.js'
class Div {
	static name = 'Div'
	render() {
		const {children, ...props} = this.props
		return <div {...props}>{this.props.children}</div>
	}
}

export default Convert(Div)
