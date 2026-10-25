import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";

import { checkUserSesssion } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSesssion());
  }, []);
  return (
    <Routes>
      <Route path="/" Component={Navigation}>
        <Route index Component={Home} />
        <Route path="auth" Component={Authentication} />
        <Route path="shop/*" Component={Shop} />
        <Route path="checkout" Component={Checkout} />
      </Route>
    </Routes>
  );
};

export default App;
