import React from "react";
import { Col, Row } from "react-bootstrap";
import Animation from "./Animation";

const CartItem = (props) => {
  const handleIncrement = (e) => {
    e.preventDefault();
    props.updateCart(props.id, props.quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    props.updateCart(props.id, props.quantity - 1);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    props.removeItemFromCart(props.id);
  };

  return (
    <>
      <Row style={{ maxHeight: "250px" }}>
        <Col className="cartItem">
          <Animation {...props} />
        </Col>
      </Row>
      <Row className="cartInfo">
        <Col xs={9}>
          <h4>{props.name}</h4>
        </Col>
        <Col xs={3}>
          <h4> {props.price.formatted_with_symbol}</h4>
        </Col>
        <Col xs={10}>
          <p>
            Quantity:{" "}
            <span>
              <button className="quantityButton" onClick={handleDecrement}>
                <i className="fas fa-minus"></i>
              </button>
            </span>{" "}
            {props.quantity}{" "}
            <span>
              <button className="quantityButton" onClick={handleIncrement}>
                <i className="fas fa-plus"></i>
              </button>
            </span>
          </p>
        </Col>
        <Col xs={2}>
          <span>
            <button className="quantityButton" onClick={handleRemove}>
              <i className="fas fa-trash"></i>
            </button>
          </span>
        </Col>
      </Row>
    </>
  );
};

export default CartItem;
