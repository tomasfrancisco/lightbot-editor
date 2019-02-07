import styled from "@emotion/styled";

type LogoWrapperProps = {
  isMobile?: boolean;
};

export const LogoWrapper = styled("div")`
  width: ${(props: LogoWrapperProps) => (props.isMobile ? 80 : 110)}px;
  height: 64px;
  margin-left: 25px;
`;
