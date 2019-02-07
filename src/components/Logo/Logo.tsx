import styled from "@emotion/styled";
import appLogoDesktop from "./app-logo-desktop.svg";
import appLogoMobile from "./app-logo-mobile.svg";
import appLogoWhite from "./app-logo-white.svg";

type LogoProps = {
  isMobile?: boolean;
  isDarkBackground?: boolean;
};

const logo = (props: LogoProps) => {
  const { isMobile, isDarkBackground } = props;
  if (isMobile) {
    return appLogoMobile;
  } else if (isDarkBackground) {
    return appLogoWhite;
  } else {
    return appLogoDesktop;
  }
};

export const Logo = styled("div")`
  background-origin: content-box;
  background-image: url(${(props: LogoProps) => logo(props)});
  background-position: left center;
  background-repeat: no-repeat;
  transition: all 0.3s;
  width: 100%;
  height: 100%;
`;
