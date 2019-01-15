import { Icon } from "antd";

import styled, { css } from "react-emotion";

export const RowTitle = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const titleInputStyle = css`
  > input {
    border-width: 1px;
    border-style: dashed;
    border-color: transparent;
    width: calc(100% - 25px);
    font-weight: bold;

    &:focus {
      border-color: transparent;
      &:hover {
        border-color: transparent !important;
      }
    }
  }
`;

export const titleErrorStyle = css`
  > input {
    border-color: red;

    &:focus {
      border-color: red;
      &:hover {
        border-color: red !important;
      }
    }
  }
`;

export const TitleStyledIcon = styled(Icon)`
  transform: scaleX(-1);
  color: rgba(0, 0, 0, 0.25);
`;

export const TitleStyledEmptyIcon = styled(Icon)`
  margin-right: 25px;
  color: red;
`;

export const titleInputHeaderStyle = css`
  > input {
    width: 100%;
    flex: 1;
  }
`;

export const emptyIconHeaderStyle = css`
  margin-right: 0px;
`;
