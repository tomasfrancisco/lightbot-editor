import * as React from "react";
import styled from "react-emotion";
import { Button } from "~/components/Button";
import theme from "~/config/theme.js";

const Wrapper = styled("div")`
  width: 100%;
  margin-bottom: 20px;
`;

const Warning = styled("span")`
  position: absolute;
  display: block;
  font-size: 12px;
  color: ${theme["default-inactive-color"]};
`;

type DeployButtonProps = {
  loading: boolean;
  onClick(): void;
};

export const DeployButton = ({ loading, onClick }: DeployButtonProps) => (
  <Wrapper>
    <Button level="success" block={true} loading={loading} onClick={onClick}>
      {loading ? "Deploying..." : "Deploy"}
    </Button>
    {loading && <Warning>This action may take a while, please wait patiently!</Warning>}
  </Wrapper>
);
