import React, { useEffect, useState } from "react";

import ItemCard from "./components/itemCard";

import styled from "styled-components";
import Commerce from "@chec/commerce.js";

/* Start off here. Create Commerce.js object and pass in your own API key
to list out your products */
const commerce = new Commerce(
  "pk_test_17788c5e094778a51f0097622b204b19d39718b621f9c"
);

/* Styled component. Play around with the styles to understand it better and
and change it to your own liking.*/
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`;

export default function App() {
  // state is used to store the product's list so it can be rendered
  const [products, setProducts] = useState([]);

  /* useEffect will fetch the data after initial render, sets the state with the
  fetched data, and then rerenders with the state*/
  useEffect(() => {
    commerce.products.list().then(res => {
      setProducts(res.data);
    });
  }, []);

  /* The Container styled component seen above is used. The product state maps out to
  each of its own ItemCard component and then passes down item details as props.*/
  return (
    <Container>
      {products.map(product => (
        <ItemCard key={product.id} {...product} />
      ))}
    </Container>
  );
}
