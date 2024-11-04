import lo from "lodash";
import { Vue, createRef, getRef } f rom "./convert.js";

class ComSub {
  name = "com_sub";
  static defaultProps = {
    fullname: "",
    now: 0,
    onDoubleClick: () => {},
    ob: {},
  };

  data() {
    return {
      gi: "",
    };
  }

  created() {
    console.log("CREATED SUB");
  }

  mounted() {
    this.intev = setInterval(() => {
      this.props.onDoubleClick("test");
    }, 2000);
  }

  beforeDestroy() {
    this.clearInterval(this.intev);
    console.log("DESTROY");
  }

  method1(a, b) {
    console.log("METHOD 1", a, b);
  }

  render() {
    console.log("RENDER CHILD");
    // let h = this.$createElement;
    let f = "";
    if (this.props.ob) f = this.props.ob.fullname || "-";
    return (
      <div>
        CHILD {this.props.fullname}.{this.props.now} {f}
      </div>
    );
  }
}
export default Vue(ComSub);
