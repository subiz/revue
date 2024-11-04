import lo from 'lodash'

export const getRef = (ref) => ref.toString()

export function createRef(obj) {
	let id = guidGenerator()
	const ref = new Proxy(new String(id), {
		get(target, prop, receiver) {
			// if (props === "__v_isRef") return false
			if (prop === 'current') {
				return obj._base_this.$refs[id]
			}
			if (prop === 'valueOf') return () => id
			if (prop === 'toString') return () => id
			return Reflect.get(...arguments)
		},
	})
	return ref
}

export function Convert(Class) {
	let com
	let props = []
	lo.map(Class.defaultProps, (v, k) => {
		props.push(k)
	})

	let vueobj = {
		watch: Object.assign({}, Class.watch),
		props: props,
		name: Class.name,
		data() {
			com = new Class()
			com._base_this = this
			return com.state || {}
		},

		created() {
			com.forceUpdate = () => this.$forceUpdate()
			if (com.name) this.name = com.name
			com.$once = this.$once.bind(this)
			com.$emit = () => this.$emit.bind(this)
			// created lifecycle
			if (com.created) com.created()

			com.$createElement = this.$createElement
			com.props = new Proxy(this._props, {
				get(target, prop, receiver) {
					if (props.length > 2 && prop.startsWith('on')) {
						let first = prop.charAt(2).toLowerCase()
						return vuethis._events[first + prop.substr(3)][0]
					}
					// return vuethis._props[prop];
					return Reflect.get(...arguments)
				},
			})
			var vuethis = this
			com.setState = function (val) {
				lo.map(val, (v, k) => {
					com.state[k] = v
					// vuethis.$set(vuethis, k, v)
					// vuethis[k] = v;
				})
				com.state = vuethis._data
			}
		},

		mounted() {
			// mounted lifecycle
			if (com.mounted) com.mounted()
			if (com.componentDidMount) com.componentDidMount()
		},

		beforeDestroy() {
			// beforeDestroy lifecycle
			if (com.beforeDestroy) com.beforeDestroy()
			if (com.componentWillUnmount) com.componentWillUnmount()
		},

		render() {
			return com.render(this.$createElement)
		},
	}
	return vueobj
}

function guidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}
