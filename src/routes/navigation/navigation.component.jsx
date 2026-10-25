import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import CrwnLogo from "../../assets/crown.svg";
import "./index.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <img src={CrwnLogo} alt="crown-logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
