import { Layout } from "antd";
import styled from "react-emotion";

const AntdHeader = Layout.Header;

type SectionHeaderProps = {
  alignment?: "right" | "left";
};

export const SectionHeader = styled(AntdHeader)`
  position: absolute;
  display: flex;
  justify-content: ${(props: SectionHeaderProps) =>
    props.alignment === "right" ? "flex-end" : "flex-start"};
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  background-color: #fff;
  height: auto;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1;

  & > * {
    &:not(:first-of-type) {
      margin-left: 0;
    }
  }
`;
