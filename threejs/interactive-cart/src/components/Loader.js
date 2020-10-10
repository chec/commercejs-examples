import React from "react";
import { Spinner } from "react-bootstrap";
import { HTML } from "drei";

const Loader = () => (
  <HTML>
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </HTML>
);

export default Loader;
