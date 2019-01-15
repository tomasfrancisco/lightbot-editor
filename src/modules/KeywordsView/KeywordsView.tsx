import { Col, Row } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { Loading } from "~/components/Loading";
import { FormEnum } from "~/constants/FormEnum";
import { Keyword } from "~/models";
import {
  fetchKeywords,
  getSelectedKeyword,
  onSelectKeyword,
  OnSelectKeywordFunction,
} from "~/modules/KeywordsView/apollo/gql";
import { KeywordEditorView, KeywordsSelectorView } from "~/modules/KeywordsView/views";
import { KeywordsBoarding } from "~/modules/OnBoarding/KeywordsBoarding";

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
            {selectedKeyword && selectedKeyword.id && (
              <KeywordEditorView selectedKeyword={selectedKeyword} />
            )}
          </Col>
        </Row>
      </LightbotLayout>
    );
  }

  public onSelectKeyword = (keyword: Keyword) => {
    this.props.onSelectKeyword({ variables: { keyword } });
  };

  public onAddKeyword = () => {
    const keyword: Keyword = {
      id: FormEnum.CREATING_ID,
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
