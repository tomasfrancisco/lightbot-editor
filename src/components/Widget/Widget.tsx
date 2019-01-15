import * as React from "react";

type WidgetProps = {
  agentId: string;
};

export class Widget extends React.Component<WidgetProps> {
  private script: HTMLScriptElement;

  constructor(props: WidgetProps) {
    super(props);

    this.script = document.createElement("script");
    this.script.id = "lightbot-widget";
    this.script.setAttribute("data-agent-id", props.agentId);
    this.script.src = "https://widget.lightbot.io/lightbot.js";
    this.script.async = true;
  }

  public render() {
    const element = document.getElementById("lightbot-widget");

    removeWidget(true, this.script);
    if (!element) {
      document.body.appendChild(this.script);
    }
    return <div />;
  }
}

export const removeWidget = (isToReplace: boolean, script?: HTMLScriptElement) => {
  const widgetElement = document.getElementById("lightbot");
  const element = document.getElementById("lightbot-widget");
  if (element) {
    if (document.body.contains(element)) {
      if (widgetElement) {
        widgetElement.remove();
      }
      if (isToReplace && script) {
        document.body.replaceChild(script, element);
      }
    }
  }
};

export const getWidgetScript = (agentID: string) => {
  return `<script id="lightbot-widget" data-agent-id=${agentID} src="https://widget.lightbot.io/lightbot.js"></script>`;
};
