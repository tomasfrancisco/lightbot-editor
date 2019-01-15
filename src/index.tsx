import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

if (process.env.NODE_ENV === "development") {
  document.title = "[DEV] Lightbot";
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
