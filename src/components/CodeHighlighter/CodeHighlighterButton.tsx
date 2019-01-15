import styled from "react-emotion";

export const CodeHighlighterButton = styled("button")`
  cursor: pointer;
  position: absolute;
  background: #ff6d00;
  padding: 4px 12px;
  top: 15px;
  right: 15px;
  border: 1px solid #c05302;
  border-radius: 4px;
  transition: ease-in-out 300ms;

  &:hover {
    box-shadow: 0 3px 9px 2px rgba(255, 109, 0, 0.45);
    transform: translate(0, -2px);
  }
`;
