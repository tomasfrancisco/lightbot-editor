import { message } from "antd";
import _isEqual from "lodash.isequal";
import * as React from "react";
import { compose } from "react-apollo";
import { Loading } from "~/components/Loading";
import { FormEnum } from "~/constants/FormEnum";
import { BatchDictionaryData, Keyword, KeywordValue } from "~/models";
import {
  createKeyword,
  CreateKeywordFunction,
  deleteKeyword,
  DeleteKeywordFunction,
  fetchKeywordValues,
  updateKeyword,
  UpdateKeywordFunction,
} from "~/modules/KeywordsView/apollo/gql";
import { KeywordEditorForm } from "./KeywordEditorForm";

export type KeywordEditorViewProps = {
  values?: KeywordValue[];
  loading?: boolean;
  selectedKeyword: Keyword;
  updateKeyword: UpdateKeywordFunction;
  onCreateKeyword: CreateKeywordFunction;
  onDeleteKeyword: DeleteKeywordFunction;
};

type KeywordEditorViewState = {
  hasDataChanged: boolean;
};

class KeywordEditorViewDisconnected extends React.Component<
  KeywordEditorViewProps,
  KeywordEditorViewState
> {
  public static defaultProps = {
    loading: false,
    values: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      hasDataChanged: false,
    };
  }

  public componentWillReceiveProps(nextProps) {
    // In case intent item has changed or updated
    if (this.props.selectedKeyword !== nextProps.selectedKeyword) {
      this.setState({
        hasDataChanged: false,
      });
    }
  }

  public render() {
    const { selectedKeyword, loading, values } = this.props;
    const { hasDataChanged } = this.state;

    if (loading || !values) {
      return <Loading />;
    } else {
      return (
        <KeywordEditorForm
          key={selectedKeyword.id + "-" + values.length}
          selectedKeyword={selectedKeyword}
          values={values}
          onDataSave={this.onDataSave}
          onDelete={this.onDelete}
          isTouched={hasDataChanged}
          onTouch={this.onDataChange}
        />
      );
    }
  }

  private onDataChange = () => {
    this.setState({
      hasDataChanged: true,
    });
  };

  private onDelete = (id: string) => {
    message
      .loading("Deleting Keyword", 1)
      .promise.then(() =>
        this.props.onDeleteKeyword({
          variables: { keyword: { id } },
        }),
      )
      .then(() => {
        message.success("Deleted successfully!");
      })
      .catch(() => {
        message.error("An error occurred while deleting the keyword.");
      });
  };

  private onDataSave = (data: BatchDictionaryData) => {
    const { selectedKeyword } = this.props;

    if (selectedKeyword.id !== FormEnum.CREATING_ID) {
      this.updateKeyword(data);
    } else {
      this.createKeyword(data);
    }
  };

  private createKeyword = (data: BatchDictionaryData) => {
    message
      .loading("Creating Keyword", 1)
      .promise.then(() => {
        return this.props.onCreateKeyword({
          variables: { keyword: { name: data.name } },
        });
      })
      .then(keywordCreated => {
        const keywordData = keywordCreated.data;
        if (keywordData) {
          data.id = keywordData.createDictionary.id;
          return this.props.updateKeyword({
            variables: { updatedKeyword: data },
          });
        } else {
          return Promise.reject();
        }
      })
      .then(() => {
        message.success("Created successfully!");
      })
      .catch(() => {
        message.error("An error occurred while creating the keyword.");
      });
  };

  private updateKeyword = (data: BatchDictionaryData) => {
    message
      .loading("Updating Keyword", 1)
      .promise.then(() =>
        this.props.updateKeyword({
          variables: { updatedKeyword: data },
        }),
      )
      .then(() => {
        message.success("Updated successfully!");
        this.setState({
          hasDataChanged: false,
        });
      })
      .catch(() => {
        message.error("An error occurred while updating the keyword.");
      });
  };
}

export const KeywordEditorView = compose(
  fetchKeywordValues,
  updateKeyword,
  createKeyword,
  deleteKeyword,
)(KeywordEditorViewDisconnected);
