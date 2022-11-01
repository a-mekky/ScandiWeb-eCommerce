import { PureComponent } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.css';
import Attribute from './../../Commponents/Attributes/productAttributes';
import ProductGallery from '../../Commponents/ProductGallery/ProductGallery';
import Counter from '../../Commponents/Counter/Counter';
import TotalProductSum from '../../Commponents/TotalProductSum/TotalProductSum';

class Cart extends PureComponent {
    state = {
        currencyState: null,
        price: null,
        qty: 0,
        total: 0
    }
    HandelSum() {
        let sum = 0
        this.props.state.cart.products.forEach((item) => {
            let product = item.productDetails
            let currentCurrency = product.prices.find(obj => {
                return obj.currency.label === this.props.state.currency.currency
            })
            sum += Number(currentCurrency.amount * item.qty)
            return this.setState({ total: sum, currencySymble: currentCurrency.currency.symbol })
        })
    }

    componentDidMount() {
        this.setState({ currencyState: this.props.state.currency })
        this.props.state.cart.products.forEach((item) => {
            let currentCurrency = item.productDetails.prices.find(obj => {
                return obj.currency.label === this.props.state.currency.currency
            })
            this.setState({ price: currentCurrency })
        })
        let qty = 0
        this.props.state.cart.products.forEach(item => {
            qty += item.qty
        })
        this.setState({ qty: qty })
        this.HandelSum()
    }

    componentDidUpdate() {
        let qty = 0
        this.props.state.cart.products.forEach(item => {
            qty += item.qty
        })
        this.setState({ qty: qty })
        this.HandelSum()
        if (this.props.state.cart.products.length === 0) {
            this.setState({ total: 0 })
        }
    }


    render() {
        const { products } = this.props.state.cart
        return (<>
            <div className={style.shopping_cart}>
                <div>
                    {products.length === 0 ? (<p className={style.title}>No products yet</p>) : (
                        <>
                            <p className={style.title}>CART</p>
                            <>
                                {products.map((item, key) => {
                                    let currentCurrency = item.productDetails.prices.find(obj => {
                                        return obj.currency.label === this.props.state.currency.currency
                                    })

                                    return (
                                        <div className={style.item} key={key}>
                                            <div className={style.item_details}>
                                                <p className={style.productBrand}>{item.productDetails.brand}</p>
                                                <p className={style.productname}>{item.productDetails.name}</p>
                                                <p className={style.productPrice}>{currentCurrency.currency.symbol}{currentCurrency.amount}</p>
                                                {item.productDetails.attributes &&
                                                    <Attribute attributes={item.productDetails.attributes} id={item.itemId} miniCart={false} />
                                                }

                                            </div>
                                            <Counter qty={item.qty} id={item.itemId} pageSize={true} />
                                            <div className={style.item_gallery}>
                                                <ProductGallery gallery={item.productDetails.gallery} width={'200px'} height={'288px'} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                            <div className={style.orderSection}>
                                <div>
                                    <p>Tax 21%: </p>
                                    <span>
                                        {this.state.currencySymble}
                                        {Number(this.state.total * 0.21).toFixed(2)}
                                    </span>
                                </div>
                                <div>
                                    <p>Quantity: </p>
                                    <span>
                                        {this.state.qty}
                                    </span>
                                </div>
                                <div>
                                    <p>Total: </p>
                                    <span className={style.totalPrice}>
                                        {this.state.currencySymble}
                                        {Number(this.state.total).toFixed(2)}
                                    </span>
                                </div>

                                <button> ORDER </button>
                                <br /><br /><br /><br />
                            </div>
                        </>)}
                </div>

            </div>

        </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);