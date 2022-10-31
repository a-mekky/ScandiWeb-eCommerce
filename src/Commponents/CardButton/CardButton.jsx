import { PureComponent } from "react";
import style from "./CardButton.module.css";
import  Cart  from './../../Assists/Cart.svg';


class CardButton extends PureComponent {
  state = {  } 
  render() { 
    const { item, onBtnClick } = this.props;
    return (
      <button onClick={onBtnClick} className={style.btn} type="submit">
        <img id={item.id} src={Cart} alt="addToCartIcon" />
      </button>
    )
  }
}
 
export default CardButton;
