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
    }


    render() {
        const { products } = this.props.state.cart
        return (<>
            <div className={style.shopping_cart}>
                <div className={style.title}>
                    {products.length === 0 ? (<h2>No Products Yet</h2>) : (
                        <>
                            <h2>Cart</h2>
                            <>
                                {products.map((item, key) => {
                                    let currentCurrency = item.productDetails.prices.find(obj => {
                                        return obj.currency.label === this.props.state.currency.currency
                                    })

                                    return (
                                        <div className={style.item} key={key}>
                                            <div className={style.item_details}>
                                                <h4>{item.productDetails.name}</h4>
                                                <h5><b><span>{currentCurrency.currency.symbol}</span> {currentCurrency.amount}</b></h5>
                                                <Attribute attributes={item.productDetails.attributes} id={item.itemId}/>
                                            </div>
                                            <div>
                                                <Counter qty={item.qty} id={item.itemId} pageSize={true} />
                                            </div>
                                            <div className={style.item_gallery}>
                                                <ProductGallery gallery={item.productDetails.gallery} width={'200px'} height={'230px'} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                            <div className={style.orderSection}>
                                <div>
                                    <span>Tax 21%: </span>
                                    <span>
                                        <b>
                                            {Number(this.state.total * 0.21).toFixed(2)} 
                                        </b>
                                    </span>
                                </div>
                                <div>
                                    <span>Quantity: </span>
                                    <span>
                                        <b>
                                            {this.state.qty}
                                        </b>
                                    </span>
                                </div>
                                <TotalProductSum products={products} />
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