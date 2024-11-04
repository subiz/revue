# Revue

[![npm version](https://img.shields.io/npm/v/@subiz/revue.svg?style=flat-square)](https://www.npmjs.org/package/@subiz/revue)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@subiz/revue&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@subiz/revue)

Cross platform component, works both on React Native and web

- Convert a component to **Vue 2** component
- Convert a component to **React** component

### Installation

```sh
npm i --save @subiz/revue
```

### Usage

#### lifecycle

```js
import {Convert} from '@subiz/revue'

class Com {
	state = {}
	// created
	constructor(props) {
		super(props)
	}

	// mounted
	componentDidMount() {}

	// beforeDestroy
	componentWillUnmount() {}

	render() {
		return <div>hello</div>
	}
}

export default Convert(Com)
```

#### State and props

```js
import {Convert} from '@subiz/revue'

class Com {
	static defaultProps = {
		fullname: null,
		onDoubleClick: null,
	}

	state = {
		display: false,
		val: 'do',
	}

	onClick = () => {
		this.setState({display: !this.state.display})
		this.props.onDoubleClick('ok')
	}

	render(h) {
		return (
			<div>
				<p>STATE: {this.state.display}</p>
				<p>PROPS: {this.props.fullname}</p>
				<button onClick={this.onClick}>Click</button>
			</div>
		)
	}
}

export default Convert(Com)
```

#### ref

```js
import {Convert, createRef, getRef} from '@subiz/revue'

class Com {
	inputRef = createRef(this)
	componentDidMount() {
		setInterval(() => {
			this.inputRef.current.focus()
		}, 1000)
	}
	render() {
		return <input ref={getRef(this.inputRef)} />
	}
}

export default Convert(Com)
```

#### watch

```js
import {Convert} from '@subiz/revue'

class Com {
	static defaultProps = {
		fullname: null,
	}

	static watch = {
		fullname(n, o) {
			console.log('FULLNAME CHANGED', n, o)
		},
	}

	render() {
		return <div>hello</div>
	}
}

export default Convert(Com)
```

#### css:hover

```js
import {Convert} from '@subiz/revue'

class Com {
	render() {
		return (
			<Div
				style={{color: 'blue}}
				hover_style={{background: 'pink'}}
				onMouseover={(e) => console.log(e)}
			>
				hello
			</Div>
		)
	}
}

export default Convert(Com)
```

### Supported

#### Vue2 web

- [x] state
- [x] prop
- [x] mounted
- [x] forceUpdate, $forceUpdate
- [x] $nextTick
- [x] beforeDestroy
- [x] created
- [x] $once
- [x] $emit
- [x] data
- [x] name
- [x] watch
- [x] ref
- [ ] DOM
- - [ ] div
- - [ ] span
- - [ ] button
- [x] css hover
- [ ] method

#### React native

- [ ] state
- [ ] prop
- [ ] mounted
- [ ] forceUpdate, $forceUpdate
- [ ] beforeDestroy
- [ ] $nextTick
- [ ] created
- [ ] $once
- [ ] $emit
- [ ] data
- [ ] name
- [ ] watch
- [ ] ref
- [ ] DOM
- - [ ] div
- - [ ] span
- - [ ] button

### Limitation

#### CSS

**style inheritance**
There is no style inheritance

HTML

```html
<div class="parent">
	<div class="child">HELLO</div>
</div>
```

CSS

```css
.parent {
	color: red;
}
```

Color of HELLO will be default (`black`) instead of `red`.

**display**
Not supported: `inline-block`, `block`, `grid`
`display` can only be: `flex` or `none`

```css
div {
	display: flex | none;
}
```

**position**
Not supported: `static`, `fixed`, `sticky`
`position` can only be: `relative` or `absolute`

```css
div {
	position: relative | absolute;
}
```

**unit**
Use `px` only, do not use `em`, `pt`, ...

```css
div {
	width: 20px;
}
```

**transform**
Please do not use

**pseudo class**
These following CSS pseudo classes do not work:

- `:checked`
- `:nth-child`
- `:first-child`
- `:last-child`
- `:hover`

JS

- `click_stop`

## License

[MIT](LICENSE)
