import * as React from "react";
import { ApolloProvider } from "react-apollo";
import WebFont from "webfontloader";

import { client } from "./apollo";
import { Routing } from "./routing/Routing";

WebFont.load({
  google: {
    families: ["Assistant"],
  },
});

export class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    );
  }
}
