import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_ProductByID } from '../../Services/GraphqlRequests';
import style from './PDP.module.css'
import Attributes from '../../Commponents/Attributes/productAttributes';
import { connect } from 'react-redux';
import { addToCart } from './../../Redux/Actions';





class PDP extends PureComponent {
    state = {
        productId: null,
        selectImage: null,
        selectedAtribute: [],
        length: 0,
    };
    componentDidMount() {
        const url = new URL(window.location.href);
        const Id = url.href.split('/')[4]
        this.setState({ productId: Id });
    };

    render() {

        const handelActiveImage = (img) => {
            this.setState({ selectImage: img })
        }
         const setAttribute = (name, value) => {
            const attributeState = this.state.selectedAtribute
            // Assign new attribute 
            const updatedAttributes = Object.assign(...attributeState, { [name]: value })

            // Sperate into multi objects
            // const newStateAttribute = Object.keys(updatedAttributes).map(key => ({ [key]: updatedAttributes[key] }))
            // Set New State
            this.setState({ selectedAtribute: [updatedAttributes] })

        }

        const addToCart = (data, selectedAttributes,) => {
            
            if (data.attributes.length === 0) {
                this.props.addToCart(data)
            }
            else if (this.state.selectedAtribute.length === 0) {
                alert("Please Select The Attributes First")
            }
            else if (Object.keys(this.state.selectedAtribute[0]).length === data.attributes.length) {
                this.props.addToCart(data, selectedAttributes)
                this.setState({ selectedAtribute: [] })
                this.props.navigate(`/cart`)
            }
            else {
                alert("Please Select Other Attributes First")
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
                                    <main className={style.container__main_flex}>
                                        <div className={style.container__left}>
                                            {data.product.gallery.map((img, key) => {
                                                return (
                                                    <div key={key} onClick={() => { handelActiveImage(img) }} className={style.image_details}>
                                                        <img src={img} height={150} width={150} alt={'ProductImage'} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className={style.container__middle}>
                                            <img src={this.state.selectImage ? this.state.selectImage : data.product.gallery[0]} width={'500rem'} alt={'ProductImage'} />
                                        </div>

                                        <div className={style.container__right}>
                                            <div className={style.product_description}>
                                                <span >{data.product.brand}</span>
                                                <h1>{data.product.name}</h1>
                                            </div>

                                            <Attributes attributes={data.product.attributes} setAttribute={setAttribute} />

                                            <div className={style.product_price}>
                                                <div>
                                                    <p><b>PRICE:</b></p>
                                                    <span><b>{currentCurrency.currency.symbol} {currentCurrency.amount} </b></span>
                                                </div>
                                            </div>
                                            <br />
                                            <div className={style.cartBtn}>
                                                {!data.product.inStock ? (
                                                    <button disabled>  ADD TO CART </button>) : (
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