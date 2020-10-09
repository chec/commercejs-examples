import React, { useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import Item from "./components/Item";
import Navigation from "./components/Navigation";

const commerce = new Commerce(
  "pk_test_183505c17b9df667acd2e6f925c4957b715322209303f"
);

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();
  const [numberOfItems, setNumberOfItems] = useState("");

  // on Component Mount, retrieve cart and list products
  useEffect(() => {
    commerce.products.list().then((res) => {
      setProducts(res.data);
    });
    commerce.cart.retrieve().then((res) => {
      setCart(res);
    });
  }, []);

  // whenever cart changes, list number of items in cart
  // handles undefined state (while call to commerce is made)
  useEffect(() => {
    cart !== undefined
      ? setNumberOfItems(cart.total_items)
      : setNumberOfItems("");
  }, [cart]);

  //adds products to the cart (both via a call to commerce, and locally)
  const addToCart = (productId, variantInfo) => {
    commerce.cart.add(productId, variantInfo).then((res) => {
      setCart(res.cart);
    });
  };

  // if count of an item is 0, deletes item from cart.
  // otherwise, updates cart info via call to commerce and local state update
  const updateCart = (itemId, count) => {
    count === 0
      ? commerce.cart.remove(itemId).then((res) => setCart(res.cart))
      : commerce.cart.update(itemId, { quantity: count }).then((res) => {
          setCart(res.cart);
        });
  };

  //removes item from commerce's cart, and sets local cart state
  const removeItemFromCart = (itemId) => {
    commerce.cart.remove(itemId).then((res) => setCart(res.cart));
  };

  return (
    <div>
      <Navigation
        cart={cart}
        products={products}
        numberOfItems={numberOfItems}
        updateCart={updateCart}
        removeItemFromCart={removeItemFromCart}
      />
      {products.map((product) => (
        <Item key={product.id} {...product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default App;
