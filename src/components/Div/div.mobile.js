import React, {Component} from 'react'
import {StyleSheet, View, Animated} from 'react-native'

export default class Div extends Component {
	render() {
		const {children, ...props} = this.props
		return <View {...props}>{this.props.children}</View>
	}
}
