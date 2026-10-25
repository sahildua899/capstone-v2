import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <div className="cart-icon-container" onClick={toogleIsCartOpen}>
      <img src={ShoppingIcon} className="shopping-icon" alt="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
