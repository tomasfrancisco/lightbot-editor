import React from "react";
import styled from "react-emotion";

const Container = styled("div")`
  position: relative;
  background: #2d2d34;
  color: #fff;
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  border-radius: 3px;
`;

const CodeSection = styled("code")`
  display: block;
  width: 90%;
  padding: 20px 0;
  overflow-x: scroll;
  white-space: nowrap;
`;

const Tag = styled("span")`
  color: #8be9fd;
`;

const Attribute = styled("span")`
  color: #50fa7b;
`;

const Value = styled("span")`
  color: #ffb86c;
`;

type CodeHighlighterProps = {
  agentId: string;
};

export class CodeHighlighter extends React.Component<CodeHighlighterProps> {
  public render() {
    return (
      <Container>
        <CodeSection>
          <span>&lt;</span>
          <Tag>script</Tag>
          <span>{`${" "}`}</span>
          <Attribute>id</Attribute>
          <span>="</span>
          <Value>lightbot-widget</Value>
          <span>" </span>
          <Attribute>data-agent-id</Attribute>
          <span>="</span>
          <Value>{this.props.agentId}</Value>
          <span>" </span>
          <Attribute>src</Attribute>
          <span>="</span>
          <Value>{`https://widget.lightbot.io/lightbot.js`}</Value>
          <span>"&gt;&lt;/</span>
          <Tag>script</Tag>
          <span>&gt;</span>
        </CodeSection>
        {this.props.children}
      </Container>
    );
  }
}
