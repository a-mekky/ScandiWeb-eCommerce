
import { PureComponent, createRef } from 'react';
import style from './CartProducts.module.css'
import Attribute from './../../Commponents/Attributes/productAttributes';
import ProductGallery from '../../Commponents/ProductGallery/ProductGallery';
import Counter from '../../Commponents/Counter/Counter';
import { connect } from 'react-redux';


class CartProducts extends PureComponent {
    state = {}

    render() {
        const { product, miniCart } = this.props
        let currentCurrency = product.productDetails.prices.find(obj => {
            return obj.currency.label === this.props.state.currency.currency
        })
        return (
            <>
                <div className={style.item} key={product.itemId}>
                    <div className={style.item_details}>
                        <p className={miniCart ? undefined : style.productBrand}>{product.productDetails.brand}</p>
                        <p className={!miniCart ? style.productname : style.itemName }>{product.productDetails.name}</p>
                        <p className={!miniCart ? style.productPrice : style.itemPrice}>{currentCurrency.currency.symbol}{currentCurrency.amount}</p>
                        {product.productDetails.attributes.length > 0 &&
                            <Attribute attributes={product.productDetails.attributes} id={product.itemId} miniCart={miniCart ? true : false} />
                        }
                    </div>
                    <Counter qty={product.qty} id={product.itemId} pageSize={miniCart ? undefined : true} />
                    <div className={style.item_gallery}>
                        <ProductGallery gallery={product.productDetails.gallery} width={miniCart ? '121px' :  '200px'} height={miniCart ? '190px' :'288px'} />
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


export default connect(mapStateToProps, null)(CartProducts)
