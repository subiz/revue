import lo from 'lodash'

let g_env = ''

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
	console.log('KKKKKKKKKKKKKKKKK', isWeb())
	if (isWeb()) return ConvertWeb(Class)
}

export function ConvertWeb(Class) {
	let props = []
	lo.map(Class.defaultProps, (v, k) => {
		props.push(k)
	})

	let vueobj = {
		watch: Object.assign({}, Class.watch),
		props: props,
		name: Class.name,
		data() {
			this.__com = new Class()
			this.__com._base_this = this

			if (typeof this.__com.data === 'function') {
				this.__com.state = this.__com.data()
			}
			return this.__com.state || {}
		},

		created() {
			this.__com.forceUpdate = () => this.$forceUpdate()
			this.__com.$forceUpdate = () => this.$forceUpdate()
			if (this.__com.name) this.name = this.__com.name
			this.__com.$once = this.$once.bind(this)
			this.__com.$emit = () => this.$emit.bind(this)
			// created lifecycle
			if (this.__com.created) this.__com.created()
			this.__com.$nextTick = this.$nextTick.bind(this)
			this.__com.$createElement = this.$createElement
			var vuethis = this
			this.__com.props = new Proxy(this._props, {
				get(target, prop, receiver) {
					if (prop == 'children') return vuethis.$slots.default
					if (prop.length > 2 && prop.startsWith('on')) {
						let first = prop.charAt(2).toLowerCase()
						return vuethis._events[first + prop.substr(3)][0]
					}
					// return vuethis._props[prop];
					return Reflect.get(...arguments)
				},
			})
			this.__com.setState = function (val, cb) {
				lo.map(val, (v, k) => {
					vuethis.__com.state[k] = v
					// vuethis.$set(vuethis, k, v)
					// vuethis[k] = v;
				})
				vuethis.__com.state = vuethis._data
				this.$nextTick(cb)
			}
		},

		mounted() {
			// mounted lifecycle
			if (this.__com.mounted) this.__com.mounted()
			if (this.__com.componentDidMount) this.__com.componentDidMount()
		},

		beforeDestroy() {
			// beforeDestroy lifecycle
			if (this.__com.beforeDestroy) this.__com.beforeDestroy()
			if (this.__com.componentWillUnmount) this.__com.componentWillUnmount()
		},

		render() {
			return this.__com.render(this.$createElement)
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

export function setEnvWeb() {
	console.log('SEEEEEEEEEETTTTTTTTT web')
	g_env = 'web'
}

export function setEnvMobile() {
	g_env = 'mobile'
}

export function isWeb() {
	return true
	return g_env == 'web'
}
