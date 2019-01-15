import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { RoutesKeysEnum, Routing } from "~/routing";

const Wrapper = styled("div")`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomeView = () => (
  <Wrapper>
    <h1>Welcome to Lightbot</h1>
    <Link to={Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path as string}>Login</Link>
  </Wrapper>
);
