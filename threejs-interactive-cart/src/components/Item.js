// Import our dependencies
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Animation from "./Animation";
import "./style.css";

// Build a card that will show our products
function Item(props) {
  const [color, setColor] = useState();
  const [optionId, setOptionId] = useState();
  // need to take out the pTags included with description string
  // if value is null(the default), returns empty string
  const description =
    props.description !== null
      ? props.description.slice(3, props.description.length - 4)
      : "";

  const variantsAvailable = props.variants[0] !== undefined;

  // This takes in a string (color name combined with hex color) and splits them
  const splitNameFromHex = (input) => {
    return input.split(" ");
  };

  // defining variants makes the map below a lot cleaner to read
  let variants;
  // checks for available variants in the product
  variantsAvailable
    ? (variants = props.variants[0].options)
    : (variants = null);

  const handleColorChoice = (index) => {
    setColor(splitNameFromHex(variants[index].name)[1]);
    setOptionId(variants[index].id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    variants !== null
      ? props.addToCart(props.id, 1, { [props.variants[0].id]: optionId })
      : props.addToCart(props.id);
  };

  return (
    <Row className="item">
      <Col sm={6} style={{ padding: 0 }}>
        <Animation {...props} uniqueId={props.id} color={color} />
      </Col>
      <Col className="info">
        <h2>{props.name}</h2>
        <br />
        <br />
        <p>{description}</p>
        <Row className="buttonRow">
          {/* checks for available color variants, and either renders buttons or an empty column */}
          {variantsAvailable ? (
            <Col>
              <p>Available Colors:</p>
              {/* maps through the different color variants, dynamically providing id name (to match CSS) and then provides correct hex color options */}
              {variants.map((variant, index) => (
                <Button
                  key={splitNameFromHex(variants[index].name)[0]}
                  className={"colorButton"}
                  style={{
                    backgroundColor: splitNameFromHex(variants[index].name)[1],
                  }}
                  onClick={() => handleColorChoice(index)}
                ></Button>
              ))}
            </Col>
          ) : (
            <Col></Col>
          )}
          <Col style={{ textAlign: "right" }}>
            <p>Price: {props.price.formatted_with_symbol}</p>
            <Button
              className="addToCart"
              variant="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Item;
