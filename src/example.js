import lo from "lodash";
import { Vue, createRef, getRef } from "./convert.js";
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
      // this.$refs["thanh"].focus()
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

/*
export default {
  created() {
    com.$createElement = this.$createElement;
  },
  methods: {
    renderA() {
      return <div>AA</div>;
    },
  },
  render() {
    return (
      <div>
        {this.renderA()}
        thanh{com.render(this.$createElement)}
        <div>--------------</div>
      </div>
    );
  },
};
*/
