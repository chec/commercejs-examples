import React from "react";
import styled from "styled-components";

const Card = styled.div`
  height: 300px;
  width: 200px;
  padding: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CardImg = styled.img`
  width: 100%;
  height: 120px;
`;

const BuyButton = styled.button`
  color: white;
  background: dodgerblue;
  border: none;
  padding: 10px 20px;
`;

/* Props from the parent component(App.js) can then be used to dynamically list
out item details */
const ItemCard = props => {
  return (
    <Card>
      <CardImg src={props.media.source} />
      <div>
        <h3>{props.name}</h3>
        <h4>{props.price.formatted_with_symbol}</h4>
      </div>
      <div>
        <p>Quantity: {props.quantity}</p>
        <a href={props.checkout_url.display}>
          <BuyButton>BUY NOW</BuyButton>
        </a>
      </div>
    </Card>
  );
};

export default ItemCard;
