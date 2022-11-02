import { createRef, PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_CURRENCIES } from '../../Services/GraphqlRequests';
import style from './Currencies.module.css'
import { Client } from './../../Services/Fetch_From_API';
import { connect } from 'react-redux';
import { changeCurrency, setCurrencyFirstTime } from './../../Redux/Actions';
import PopupMessage from './../PopupMessage/PopupMessage';

class Currencies extends PureComponent {
    state = {
        open: false,
        label: '$',
        currency: null,
    };
    container = createRef();

    componentDidMount() {
        if (localStorage.getItem('reduxState')) {
            let localState = JSON.parse(localStorage.getItem('reduxState'))
            Client.query({
                query: GET_CURRENCIES()
            }).then(res => this.setState({ label: res.data.currencies.find(el => { return el.label === localState.currency.currency }).symbol }))
        }
        else{
            Client.query({
                query: GET_CURRENCIES()
            }).then(res => this.props.setCurrencyFirstTime(res.data.currencies[0].label))
        }


        document.addEventListener('click', this.handleClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    PopupMessageHandler(message) {
        this.setState({ message: message })
        setTimeout(() => this.setState({ message: null }), 3000)
    }

    selectedCurrency = (currency) => {
        this.setState({ currency: currency })
        this.props.setCurrency(currency)
        this.PopupMessageHandler('Currency changed successfully')
    }
    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };
    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({ open: false })
        }
    };

    hadleListItemClick = event => {
        const [symbol] = event.target.innerText;
        const currency = event.target.innerText.split(/(\s+)/)[2]
        this.setState({
            label: symbol,
            open: false,
        });
        this.selectedCurrency(currency)

    };


    render() {
        const buttonStyle = this.state.open
            ? `${style.button} ${style['button--open']}`
            : `${style.button} ${style['button--closed']}`;
        return (
            <Query query={GET_CURRENCIES()}>
                {({ loading, data }) => {
                    if (loading) return <h2>Loading...</h2>;
                    else return (<>
                        {this.state.message && <PopupMessage message={this.state.message} />}
                        <div className={style.container} ref={this.container}>

                            <button type="button" className={buttonStyle} onClick={this.handleButtonClick}>
                                {this.state.label}
                            </button>

                            {this.state.open && (
                                <div className={style.dropdown}>
                                    <ul style={{ paddingLeft: '0px' }}>
                                        {data.currencies.map(item => (
                                            <li key={item.symbol} data={item.symbol} title={item.symbol} onClick={this.hadleListItemClick}>
                                                {item.symbol} {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>)
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
        setCurrencyFirstTime: (currency) => dispatch(setCurrencyFirstTime(currency))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);