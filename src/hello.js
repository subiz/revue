import { Vue, createRef, getRef, div } from "./lib.js";

export class Hello {
  name = "hello";
  data() {
    return {
      a: 5,
    };
  }

  state = {
    a: 5,
  };

  mount() {}

  componentDidMount() {}

  beforeDestroy() {}

  componentWillUnmount() {}

  render() {
    return <div>hello</div>;
  }
}
