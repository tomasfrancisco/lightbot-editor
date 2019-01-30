import * as React from "react";
import { Link } from "react-router-dom";

export const TrapView = () => (
  <div>
    <h1>404 Not found</h1>
    <Link to={"/"}>
      <span>Back to Home</span>
    </Link>
  </div>
);
