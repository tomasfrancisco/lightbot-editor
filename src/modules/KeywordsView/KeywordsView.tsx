import { Col, Row } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { Loading } from "src/components/Loading";
import { FormId } from "src/constants/FormId";
import { Keyword } from "src/models";
import {
  fetchKeywords,
  getSelectedKeyword,
  onSelectKeyword,
  OnSelectKeywordFunction,
} from "src/modules/KeywordsView/apollo/gql";
import { KeywordEditorView, KeywordsSelectorView } from "src/modules/KeywordsView/views";
import { KeywordsBoarding } from "src/modules/OnBoarding/KeywordsBoarding";

import { LightbotLayout } from "../LightbotLayout";

type KeywordsViewProps = {
  keywords?: Keyword[];
  selectedKeyword?: Keyword;
  loading?: boolean;
  onSelectKeyword: OnSelectKeywordFunction;
  reloadKeywords: () => void;
};

class KeywordsViewDisconnected extends React.Component<KeywordsViewProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { keywords, selectedKeyword, loading } = this.props;
    return (
      <LightbotLayout>
        <Row>
          {keywords && <KeywordsBoarding />}
          <Col span={10}>
            {loading ? (
              <Loading />
            ) : (
              <KeywordsSelectorView
                keywords={keywords}
                selectedKeyword={selectedKeyword}
                onSelectKeyword={this.onSelectKeyword}
                onAddKeyword={this.onAddKeyword}
              />
            )}
          </Col>
          <Col span={14}>
            {selectedKeyword &&
              selectedKeyword.id && <KeywordEditorView selectedKeyword={selectedKeyword} />}
          </Col>
        </Row>
      </LightbotLayout>
    );
  }

  public onSelectKeyword = (keyword: Keyword) => {
    this.props.onSelectKeyword({ variables: { keyword } });
  };

  public onAddKeyword = () => {
    const creatingId: FormId = "-1";

    const keyword: Keyword = {
      id: parseInt(creatingId, 10),
      name: "",
    };
    this.props.onSelectKeyword({ variables: { keyword } });
  };
}

export const KeywordsView = compose(
  getSelectedKeyword,
  fetchKeywords,
  onSelectKeyword,
)(KeywordsViewDisconnected);
