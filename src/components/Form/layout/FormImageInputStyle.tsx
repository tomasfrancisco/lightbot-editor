import styled, { css } from "react-emotion";

export const ImageRow = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const InputImageContainer = styled("div")`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const formInputImageStyle = css`
  max-width: 90%;
  max-height: 90%;
`;
