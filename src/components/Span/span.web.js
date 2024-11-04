import {Convert} from '../../lib.js'
class Div {
	static name = 'Span'
	render() {
		const {children, style, ...props} = this.props
		let mstyle = Object.assign({}, style, {display: 'flex'})
		return (
			<div {...props} style={mstyle}>
				{this.props.children}
			</div>
		)
	}
}

export default Convert(Div)
