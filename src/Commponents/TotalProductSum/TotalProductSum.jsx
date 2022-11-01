
import { PureComponent } from 'react';
import style from './TotalProductSum.module.css'
import { connect } from 'react-redux';

class TotalProductSum extends PureComponent {
    state = { total: 0 }
    HandelSum() {
        let sum = 0
        this.props.products.map((item) => {
            let product = item.productDetails
            let currentCurrency = product.prices.find(obj => {
                return obj.currency.label === this.props.currency.currency
            })
            sum += Number(currentCurrency.amount * item.qty)
            return this.setState({ total: sum, currencySymble: currentCurrency.currency.symbol })
        })
    }
    componentDidMount() {
        this.HandelSum()
    }
    componentDidUpdate() {
        this.HandelSum()
        if (this.props.products.length === 0) {
            this.setState({ total: 0 })
        }

    }
    render() {

        return (<>
            <div className={style.total}>
                <p>Total: </p>
                <span className={style.totalPrice}>
                    {this.state.currencySymble}
                    {Number(this.state.total).toFixed(2)}
                </span>
            </div>
        </>);
    }
}
const mapStateToProps = (state) => ({
    products: state.cart.products,
    currency: state.currency,
});

export default connect(mapStateToProps, null)(TotalProductSum);