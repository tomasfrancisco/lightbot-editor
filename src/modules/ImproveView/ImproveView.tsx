import { Table as AntdTable } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { css } from "react-emotion";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
} from "~/components/Section";
import { Intent, UnknownTrigger } from "~/models";
import { deleteUnknownTrigger, fetchUnknownTriggers } from "~/modules/ImproveView/apollo/gql";
import { ColumnItem, columns, generateDataSource } from "~/modules/ImproveView/utils";
import { LightbotLayout } from "~/modules/LightbotLayout";
import { withRouteParams } from "~/routing";
import { flattenIntents } from "~/utils";

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
          <SectionHeader className={normalizeHeadingLineHeight}>
            <SectionHeaderNavContainer className={noBottomSpacingNavHeaderStyle}>
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
          <SectionContent className={topMarginImproveTableStyle}>
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
