import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_ProductByID } from '../../Services/GraphqlRequests';
import style from './PDP.module.css'
import Attributes from '../../Commponents/Attributes/productAttributes';
import { connect } from 'react-redux';
import { addToCart } from './../../Redux/Actions';
import PopupMessage from './../../Commponents/PopupMessage/PopupMessage';





class PDP extends PureComponent {
    state = {
        productId: null,
        selectImage: null,
        selectedAtribute: [],
        length: 0,
        message: null
    };
    componentDidMount() {
        const url = new URL(window.location.href);
        const Id = url.href.split('/')[4]
        this.setState({ productId: Id });
    };

    PopupMessageHandler(message) {
        this.setState({ message: message })
        setTimeout(() => this.setState({ message: null }), 3000)
    }

    render() {

        const handelActiveImage = (img) => {
            this.setState({ selectImage: img })
        }
        const setAttribute = (name, value) => {
            const attributeState = this.state.selectedAtribute
            // Assign new attribute 
            const updatedAttributes = Object.assign(...attributeState, { [name]: value })
            // Set New State
            this.setState({ selectedAtribute: [updatedAttributes] })

        }

        const addToCart = (data, selectedAttributes,) => {
            if (this.state.selectedAtribute.length === 0) {
                this.PopupMessageHandler("Please select the attributes first")
            }
            else if (Object.keys(this.state.selectedAtribute[0]).length === data.attributes.length || data.attributes.length === 0) {
                this.props.addToCart(data, selectedAttributes)
                this.setState({ selectedAtribute: [] })
                this.props.navigate(`/cart`)
            }
            else {
                this.PopupMessageHandler("Please select other attributes first")
            }
        }

        return (
            <>
                <Query query={GET_ProductByID(this.state.productId)}>
                    {({ loading, data }) => {
                        if (loading) return <h2>Loading...</h2>;
                        else if (this.props.state.currency.currency == null) return <h2>Loading...</h2>;
                        else if (data.product == null) return <h2>Product Not Found</h2>
                        else {
                            let currentCurrency = data.product.prices.find(obj => {
                                return obj.currency.label === this.props.state.currency.currency
                            })
                            return (
                                <>
                                    {this.state.message && <PopupMessage message={this.state.message} />}
                                    <main className={style.container__main_flex}>
                                        <div className={style.container__left}>
                                            {data.product.gallery.map((img, key) => {
                                                return (
                                                    <div key={key} onClick={() => { handelActiveImage(img) }} className={style.image_details}>
                                                        <img src={img} height={'80px'} width={'79px'} alt={'ProductImage'} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className={style.container__middle}>
                                            <img src={this.state.selectImage ? this.state.selectImage : data.product.gallery[0]} width={'610px'} height={'511px'} alt={'ProductImage'} />
                                        </div>

                                        <div className={style.container__right}>
                                            <div className={style.product_description}>
                                                <p className={style.product_brand}>{data.product.brand}</p>
                                                <p className={style.product_name}>{data.product.name}</p>
                                            </div>
                                            {data.product.attributes &&
                                                <Attributes attributes={data.product.attributes} setAttribute={setAttribute} inStock={data.product.inStock} />
                                            }
                                            <div className={style.product_price}>
                                                <div>
                                                    <p>PRICE:</p>
                                                    <p>{currentCurrency.currency.symbol}{currentCurrency.amount}</p>
                                                </div>
                                            </div>
                                            <br />
                                            <div className={style.cartBtn}>
                                                {!data.product.inStock ? (
                                                    <button onClick={() => this.PopupMessageHandler('Sorry this product is out of stock')}>  Out Of Stock </button>) : (
                                                    <button onClick={() => addToCart(data.product, this.state.selectedAtribute)}>  ADD TO CART </button>
                                                )}
                                            </div>
                                            <div className={style.product_description} id="product_description">
                                                <div dangerouslySetInnerHTML={{ __html: data.product.description }} />
                                            </div>
                                        </div>
                                    </main>
                                </>
                            )
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(PDP);