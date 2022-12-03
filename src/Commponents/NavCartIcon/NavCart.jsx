
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Cart from './../../Assists/Cart.svg'
import style from './NavCart.module.css'
import NavCartModal from './../NavCartModel/NavCartModel';


class NavCart extends PureComponent {
    state = {
        showModal: false,
    };
    onIconClick = () => {
        this.setState((prev) => {
            return { showModal: !prev.showModal };
        });
    };

    onModalClose = () => {
        this.setState({
            showModal: false,
        });
    };
    render() {
        const { products } = this.props.state.cart;
        const { showModal } = this.state;
        if (showModal) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
        return (
            <>
                <button type="button" onClick={this.onIconClick} className={style.buttton}>
                    <img src={Cart} width={20} height={20} alt={'CartIcon'}/>
                    
                    {products.length > 0 && (
                        <span className={style.productCount}>{products.reduce((x, object) => {
                            return x + object.qty;
                          }, 0)}</span>
                    )}
                </button>
                {showModal && <NavCartModal onCloseModal={this.onModalClose} />}
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        state
    }
}
export default connect(mapStateToProps, null)(NavCart)