import { css } from "@emotion/core";
import styled from "@emotion/styled";
import theme from "src/config/theme.json";

export const inputStyle = css`
  width: 165px;
  text-align: center;
  color: ${theme["text-color"]};
`;

export const ColorSelector = styled("div")`
  min-width: 30px;
  min-height: 30px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
`;

export const ColorRow = styled("div")`
  display: flex;
  align-items: center;
  & > * {
    &:first-child {
      width: 100%;
    }
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export const CloseContainer = styled("div")`
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 5px;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252b2d;
  cursor: pointer;
`;

export const closeButtonStyle = css`
  font-size: 20px;
  color: white;
`;
