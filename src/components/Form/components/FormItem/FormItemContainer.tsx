import styled from "@emotion/styled";

export const FormItemContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > * {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;
