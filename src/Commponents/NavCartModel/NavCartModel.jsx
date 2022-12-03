import { PureComponent } from "react";
import { connect } from "react-redux";
import style from "./NavCartModel.module.css";
import { Link } from 'react-router-dom';
import Counter from './../Counter/Counter';
import Attributes from "../Attributes/productAttributes";
import ProductGallery from "../ProductGallery/ProductGallery";
import TotalProductSum from './../TotalProductSum/TotalProductSum';
import CartProducts from './../CartProducts/CartProducts';


class NavCartModal extends PureComponent {
  state = {
    total: 0,
  };
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
    window.addEventListener("keydown", this.handleCloseModal);
    this.HandelSum()
  }
  componentDidUpdate() {
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModal);
  }

  handleCloseModal = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };


  render() {
    const { products, onCloseModal } = this.props;
    return (
      <div className={style.Overlay} onClick={this.handleCloseModal}>
        <div className={style.Modal} style={{ overflowY: products.length === 3 ? "scroll" : "hidden" }}>
          <p className={style.title}>
            My Bag,{" "}
            <span className={style.totalItems}> {products.reduce((x, object) => {
              return x + object.qty;
            }, 0)} items</span>
          </p>
          {products.map((item, key) => {
            return (
              <div key={key}>
                <CartProducts product={item} miniCart={true} />
              </div>
            )
          })}

          <div className={style.modalOptions}>
            <div>
              <TotalProductSum products={products} />
            </div>

            <div className={style.buttons}>
              <Link to={"/cart"}>
                <button className={style.buttonLink} onClick={onCloseModal}>
                  VIEW BAG
                </button>
              </Link>
              <button className={style.button}>CHECK OUT</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currency: state.currency,
});

export default connect(mapStateToProps, null)(NavCartModal);
