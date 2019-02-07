import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "src/config/theme.json";
import css from "@emotion/css";

export const formActionLinkStyle = css`
  display: block;
  text-align: left;
  color: ${theme["default-text-color"]};
  text-decoration: underline;
  margin: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const inlineFormActionLinkStyle = css`
  ${formActionLinkStyle};
  display: inline-block;
`;

export const FormActionLink = styled(Link)`
  ${formActionLinkStyle};
`;
