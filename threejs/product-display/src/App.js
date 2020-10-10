import React, { useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import Item from "./components/Item";

const commerce = new Commerce(
  "pk_test_18265006f98e5bc6f77efa3b7d99014bf7e1a31d0e6a3"
);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    commerce.products.list().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
}

export default App;
