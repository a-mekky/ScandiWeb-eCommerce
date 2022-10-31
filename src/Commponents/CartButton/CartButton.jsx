import { PureComponent } from "react";
import style from './CartButton.module.css'
import CartBttn from './../../Assists/CartBttn.svg'
class CartButton extends PureComponent {
    state = {  } 
    render() { 
        const { item, onBtnClick } = this.props;
        return (<>
        <button onClick={onBtnClick} className={style.btn} type="submit">
        <img id={item.id} src={CartBttn} alt="addToCartIcon" />
      </button>
        </>);
    }
}
 
export default CartButton;