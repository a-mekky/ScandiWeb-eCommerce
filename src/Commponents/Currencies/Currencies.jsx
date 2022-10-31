import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_CURRENCIES } from '../../Services/GraphqlRequests';
import style from './Currencies.module.css'
import { Client } from './../../Services/Fetch_From_API';
import { connect } from 'react-redux';
import { changeCurrency, setCurrencyFirstTime } from './../../Redux/Actions';

class Currencies extends PureComponent {
    
    componentDidMount() {
        Client.query({
            query: GET_CURRENCIES()
        }).then(res=>this.props.setCurrencyFirstTime(res.data.currencies[0].label))
    }
    
    selectedCurrency = (event) => {
        const currency = event.target.value
        this.setState({ currency: currency })
        this.props.setCurrency(currency)
    }
    render() {        
        return (
            <Query query={GET_CURRENCIES()}>
                {({ loading, data }) => {
                    if (loading) return <h2>Loading...</h2>;
                    else return (
                        <div className={style.custom_select}>
                            <select onChange={this.selectedCurrency} >
                                {data.currencies.map((item, key) => { 
                                    return (
                                        <option key={key} className={style.custom_option} value={item.label}>{item.symbol} {item.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    )
                }}
            </Query>
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
        setCurrency: (currency) => dispatch(changeCurrency(currency)),
        setCurrencyFirstTime: (currency)=> dispatch(setCurrencyFirstTime(currency))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);