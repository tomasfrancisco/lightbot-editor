import { Table as AntdTable } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { css } from "@emotion/core";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
} from "src/components/Section";
import { Intent, UnknownTrigger } from "src/models";
import { deleteUnknownTrigger, fetchUnknownTriggers } from "src/modules/ImproveView/apollo/gql";
import { ColumnItem, columns, generateDataSource } from "src/modules/ImproveView/utils";
import { LightbotLayout } from "src/modules/LightbotLayout";
import { withRouteParams } from "src/routing";
import { flattenIntents } from "src/utils";

import { fetchIntents } from "../IntentsView/apollo/gql";
import { DeleteUnknownTriggers, UnknownTriggerSave } from "./components";

export type ImproveViewProps = {
  agentId: string;
  unknownTriggers?: UnknownTrigger[];
  intents?: Intent[];
  intentsLoading?: boolean;
  loading?: boolean;
};

type ImproveViewState = {
  selectedUnknownTriggerItems: ColumnItem[];
};

const topMarginImproveTableStyle = css`
  margin: 0px;
  margin-top: 70px;
  padding: 0px;
`;

const normalizeHeadingLineHeight = css`
  line-height: normal;
`;

const noBottomSpacingNavHeaderStyle = css`
  margin-bottom: 0;
`;

export class ImproveViewDisconnected extends React.Component<ImproveViewProps, ImproveViewState> {
  constructor(props) {
    super(props);

    this.state = {
      selectedUnknownTriggerItems: [],
    };
  }

  public render() {
    const { agentId, unknownTriggers, loading, intentsLoading, intents } = this.props;
    const { selectedUnknownTriggerItems } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedUnknownTriggerItems: selectedRows });
      },
    };

    return (
      <LightbotLayout>
        <Section>
          <SectionHeader css={normalizeHeadingLineHeight}>
            <SectionHeaderNavContainer css={noBottomSpacingNavHeaderStyle}>
              <DeleteUnknownTriggers
                agentId={agentId}
                selectedTriggers={selectedUnknownTriggerItems}
              />
              <UnknownTriggerSave
                intentsLoading={intentsLoading}
                selectedUnknownTriggers={selectedUnknownTriggerItems}
                availableIntents={flattenIntents(intents)}
                agentId={agentId}
              />
            </SectionHeaderNavContainer>
          </SectionHeader>
          <SectionContent css={topMarginImproveTableStyle}>
            <AntdTable
              columns={columns}
              loading={loading}
              dataSource={generateDataSource(unknownTriggers)}
              pagination={false}
              rowSelection={rowSelection}
            />
          </SectionContent>
        </Section>
      </LightbotLayout>
    );
  }
}

export const ImproveView = compose(
  withRouteParams(["agentId"]),
  fetchUnknownTriggers,
  fetchIntents,
  deleteUnknownTrigger,
)(ImproveViewDisconnected);
