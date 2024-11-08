import {Convert} from '../../lib.js'
class Div {
	static name = 'Div'
	render() {
		const {children, style, ...props} = this.props
		let mstyle = Object.assign({}, style, {display: 'flex'})
		return (
			<div style={mstyle} {...props}>
				{this.props.children}
			</div>
		)
	}
}

export default Convert(Div)
