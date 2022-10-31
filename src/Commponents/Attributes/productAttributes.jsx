import { PureComponent } from 'react';
import style from './productAttributes.module.css'
import { connect } from 'react-redux';


class Attributes extends PureComponent {

    state = { selectedAtribute: [] }


    render() {
        const { setAttribute, id } = this.props


        return (
            <div>
                {this.props.attributes.map((att, key) => {
                    return (
                        <div className={style.cable_config} key={key}>
                            <p>
                            <b>{att.name}:</b>
                            </p>
                            
                            <div className={style.cable_choose}>
                                {att.items.map((attDetails, key) => {
                                    let selectedAtribute = this.props.products
                                    return (
                                        <span key={key}>
                                            {att.name === 'Color' ?
                                                <div key={attDetails.id} className={id ? style.button_color_small:style.button_color} style={{ background: `${attDetails.value}` }}
                                                    onClick={() => { !id && setAttribute(att.name, attDetails.value) }}
                                                >
                                                    <input type="radio" id={att.name} name={att.name} defaultChecked={id && selectedAtribute.find((el) => {
                                                        return el.attributes[0][att.name] === attDetails.value}) ? true : false}  disabled={id && true}/>
                                                    <label htmlFor={att.name}></label>
                                                </div>
                                                : (
                                                    <div className={id ?style.button_small :style.button }
                                                        onClick={() => { !id && setAttribute(att.name, attDetails.value) }}
                                                    >
                                                        <input type="radio" id={att.name} name={att.name} defaultChecked={id && selectedAtribute.find((el) => {
                                                            return el.attributes[0][att.name] === attDetails.value}) ? true : false} disabled={id && true} />
                                                        <label htmlFor={att.name}>{attDetails.value}</label>
                                                    </div>
                                                )}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )

                    // defaultChecked={selectedAtribute.map((el)=>{return el.attributes[0][att.name]== attDetails.value}) ? true : false}       defaultChecked={selectedAtribute[att.name] == attDetails.value ? true : false} onChange={() => { setAttribute(att.name, attDetails.value) }}
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