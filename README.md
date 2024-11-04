# Revue
Cross platform component, works both on React Native and web

* Convert a component to **Vue 2** component
* Convert a component to **React** component

```js
import { Vue, createRef, getRef } from "./lib.js";
import SubCom from "./example_sub.js";
class Com {
  name = "com";
  inputRef = createRef(this);
  state = {
    display: false,
    val: "do",
  };

  constructor() {
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ display: true });
    }, 500);
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 1000);
    console.log("MOUNT", this.inputRef);
  }

  componentWillUnmount() {
    console.log("DESTROY");
  }

  method1(a, b) {
    console.log("METHOD 1", a, b);
  }

  renderSub() {
    return <div>Sub</div>;
  }

  onInput = (e) => {
    this.setState({ val: e.target.value });
  };

  renderInput() {
    if (!this.state.display) return null;
    return (
      <input
        ref={getRef(this.inputRef)}
        value={this.state.val}
        onInput={this.onInput}
      />
    );
  }

  onClick = (text) => {
    console.log("CLICKED", text);
  };

  render(h) {
    // let h = this.$createElement;
    console.log("RENDER com:", this.onClick);
    return (
      <div>
        <h1>22222222 {this.state.val}</h1>
        {this.renderInput()}
        <SubCom
          fullname={this.state.val}
          now={Date.now()}
          ob={{ fullname: this.state.val }}
          onDoubleClick={this.onClick}
        />
      </div>
    );
  }
}
export default Vue(Com);

```

### Supported
- [X] mounted
- [X] forceUpdate	
- [X] beforeDestroy
- [X] created
- [X] $once
- [X] $emit
- [ ] data
- [X] name

### Limitation
#### CSS
**style inheritance**
There is no style inheritance

HTML

```html
<div class="parent">
  <div class="child">
    HELLO
  </div>
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
* `:checked`
* `:nth-child`
* `:first-child`
* `:last-child`
* `:hover`

JS
* `click_stop`
