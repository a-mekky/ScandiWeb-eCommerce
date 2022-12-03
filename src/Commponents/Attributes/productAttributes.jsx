import { PureComponent } from 'react';
import style from './productAttributes.module.css'
import { connect } from 'react-redux';


class Attributes extends PureComponent {

    state = { selectedAtribute: [] }

    render() {
        const { setAttribute, id, inStock, miniCart, attributes, products, innerRef } = this.props
        const isMiniCart = 'a-1'

        return (
            <div>
                {attributes.map((att, key) => {
                    return (
                        <div key={`${key}-${id}`} className={style.cable_config}>
                            <p className={miniCart ? style.attributesTitle_small : style.attributesTitle}>
                                {att.name.toUpperCase()}:
                            </p>
                            <div ref={innerRef} className={style.cable_choose}>
                                {att.items.map((attDetails) => {
                                    let productsInCart = products.find(item => { return item.itemId === id })
                                    return (
                                        <span  key={`${attDetails.id}-${id}`}>
                                            {att.name === 'Color' ?
                                                <div className={miniCart ? style.button_color_small : style.button_color} style={{ background: `${attDetails.value}` }}
                                                    onClick={() => { !id && setAttribute(att.name, attDetails.value) }}>
                                                    <input  type="radio" id={att.name} name={`${id}-${att.name}`}
                                                        defaultChecked={(id || att.items > 0) && productsInCart.attributes[0][att.name] === attDetails.value ? true : false}
                                                        disabled={(id || !inStock) && true} />
                                                    <label htmlFor={att.name}></label>
                                                </div>
                                                : (
                                                    <div className={miniCart ? style.button_small : style.button}
                                                        onClick={() => { !id && setAttribute(att.name, attDetails.value) }}>
                                                        <input type="radio" id={att.name} name={`${id}-${att.name}-${miniCart && isMiniCart}`}
                                                            defaultChecked={(id) && attDetails.value === productsInCart.attributes[0][att.name] ? true : false}
                                                            disabled={(id || !inStock) && true} />
                                                        <label htmlFor={att.name}>{attDetails.value}</label>
                                                    </div>
                                                )}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
                }

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.cart.products
    }
}


export default connect(mapStateToProps, null)(Attributes);