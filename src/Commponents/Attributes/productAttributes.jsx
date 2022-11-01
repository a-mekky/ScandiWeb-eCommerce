import { PureComponent } from 'react';
import style from './productAttributes.module.css'
import { connect } from 'react-redux';


class Attributes extends PureComponent {

    state = { selectedAtribute: [] }


    render() {
        const { setAttribute, id, inStock, miniCart } = this.props
        const isMiniCart = 'a-1'
        return (
            <div>
                {this.props.attributes.map((att, key) => {
                    return (
                        <div className={style.cable_config} key={key}>
                            <p className={miniCart ? style.attributesTitle_small : style.attributesTitle}>
                                {att.name.toUpperCase()}:
                            </p>
                            <div className={style.cable_choose}>
                                {att.items.map((attDetails, key) => {
                                    let productsInCart = this.props.products
                                    return (
                                        <span key={key}>
                                            {att.name === 'Color' ?
                                                <div key={attDetails.id} className={miniCart ? style.button_color_small : style.button_color} style={{ background: `${attDetails.value}` }}
                                                    onClick={() => { !id && setAttribute(att.name, attDetails.value) }}>
                                                    <input type="radio" id={att.name} name={`${att.name}-${id}`} defaultChecked={id || att.items > 0 && productsInCart.find((el) => {
                                                        return el.attributes[0][att.name] === attDetails.value
                                                    }) ? true : false} disabled={id || !inStock && true} />
                                                    <label htmlFor={att.name}></label>
                                                </div>
                                                : (
                                                    <div className={miniCart ? style.button_small : style.button}
                                                        onClick={() => { !id && setAttribute(att.name, attDetails.value) }}>
                                                        <input type="radio" id={att.name} name={`${att.name}-${id}-${miniCart && isMiniCart}`} defaultChecked={id || att.items > 0 && productsInCart.find((el) => {
                                                            return el.attributes[0][att.name] === attDetails.value
                                                        }) ? true : false} disabled={id || !inStock && true} />
                                                        <label htmlFor={att.name}>{attDetails.value}</label>
                                                    </div>
                                                )}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
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