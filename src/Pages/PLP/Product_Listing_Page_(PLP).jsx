import { PureComponent } from "react";
import { Query } from '@apollo/client/react/components';
import { GET_ProductByCategory } from "../../Services/GraphqlRequests";
import { Link } from 'react-router-dom';
import style from './PLP.module.css'
import { connect } from 'react-redux';
import CartButton from "../../Commponents/CartButton/CartButton";
import { addToCart } from './../../Redux/Actions';

class PLP extends PureComponent {
    state = {}
    onCartBtnClick = (product,) => {
        let selectedAttributes = []
        this.props.addToCart(product, selectedAttributes)
    };
    onBtnRedirect = (product) => {
        this.props.navigate(`/productDetails/${product.id}`)
    }


    render() {
        const fromURL = window.location.pathname.replace('/', '')
        return (<>
            <Query query={GET_ProductByCategory(this.props.porps !== null  ? this.props.porps.category : fromURL)}>
                {({ loading, data }) => {
                    if (loading) return <h2>Loading...</h2>;
                    else if (this.props.state.currency.currency == null) return <h2>Loading...</h2>;
                    else
                        return (
                            <>
                                <h1 style={{ marginLeft: '10rem' }}>{data.category.name.charAt(0).toUpperCase() + data.category.name.slice(1)}</h1>
                                <div className={style.flex_container}>
                                    {data.category.products.map((product) => {
                                        let currentCurrency = product.prices.find(obj => {
                                            return obj.currency.label === this.props.state.currency.currency
                                        })
                                        return (
                                            <div key={product.id} className={style.item}>
                                                <Link to={`/productDetails/${product.id}`} state={{ id: product.id }}>
                                                    <div className={product.inStock ? style.card : style.card_outOfStock}>
                                                        <div className={product.inStock ? style.text_inStock : style.text_outOfStock}>Out of Stock</div>
                                                        <div className={style.img}>
                                                            <img src={product.gallery[0]} alt="Product" width={500} height={350} />
                                                        </div>
                                                        <div className={style.container}>
                                                            <h4><b>{product.name}</b></h4>
                                                            <h5><b><span>{currentCurrency.currency.symbol}</span> {currentCurrency.amount}</b></h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <span className={style.CardButton}>
                                                    {product.inStock && (
                                                        <CartButton item={product}
                                                            onBtnClick={product.attributes.length === 0 ? () => this.onCartBtnClick(product) : () => this.onBtnRedirect(product)} />
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                }}
            </Query>
        </>);
    }
}
const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (data, selectedAttributes) => dispatch(addToCart(data, selectedAttributes))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PLP);