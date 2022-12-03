import { PureComponent } from "react";
import { connect } from "react-redux";
import { incrementValue, removeProduct, decrementValue, } from "../../Redux/Actions";
import style from "./Counter.module.css";

class Counter extends PureComponent {

  increment = () => {
    this.props.increment(1, this.props.id);
  };

  decrement = () => {
    if (this.props.qty === 1) {
      this.props.removeProduct(this.props.id);
    }
    return this.props.decrement(-1, this.props.id);
  };

  render() {
    const { qty } = this.props
    return (
      <div className={style.counter}>
        <button id={this.props.id} className={this.props.pageSize ? style.bigBtn : style.btn} onClick={this.increment}>
          +
        </button>
        <span className={this.props.pageSize && style.bigValue}>
          {qty}
        </span>
        <button className={!this.props.pageSize ? style.btn : style.bigBtn} onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  increment: (value, id) => dispatch(incrementValue(value, id)),
  decrement: (value, id) => dispatch(decrementValue(value, id)),
  removeProduct: (id) => dispatch(removeProduct(id)),
});

export default connect(null, mapDispatchToProps)(Counter);
