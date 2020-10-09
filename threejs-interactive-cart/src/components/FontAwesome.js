import React from "react";

const FontAwesome = ({ isCartOpen, numberOfItems }) => {
  // if cart is open, return an "x" to show where to close the cart
  // otherwise, it shows cart/number of items in cart
  return isCartOpen ? (
    <i
      className="fas fa-times"
      style={{ fontSize: "25px", padding: "12px" }}
    ></i>
  ) : (
    <div style={{ marginTop: "10px" }}>
      <i className="fas fa-shopping-cart" style={{ fontSize: "25px" }}></i>
      {/* if # of items in cart is 0, only the cart fontAwesome is shown */}
      {numberOfItems === 0 ? <></> : <p id="cartNumber">{numberOfItems}</p>}
    </div>
  );
};
export default FontAwesome;
