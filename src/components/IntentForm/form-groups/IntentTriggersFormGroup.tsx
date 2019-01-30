import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { FormGroup, FormItem } from "src/components/Form";
import {
  renderCombinationTriggerInput,
  renderPlainTriggerInput,
} from "src/components/Form/wrappers";
import { IntentFormIndexType } from "src/components/IntentForm/IntentFormIndex.enum";
import { TriggerAddButtonGroup } from "src/components/IntentForm/TriggerAddButtonGroup";
import { CombinationTrigger, PlainTrigger, Trigger, TriggerTypeEnum } from "src/models";
import { Dictionary } from "src/types";
import { getUniqueNumberForSession } from "src/utils";

type TriggerItemsType = {
  components: React.ReactNode[];
};

type IntentTriggersFormGroupProps = FormComponentProps & {
  formKey: string;
  triggers: Trigger[];
  dictionaries: Dictionary[];
  onTouch?(): void;
};

type IntentTriggersFormGroupState = {
  triggers: Trigger[];
};

export class IntentTriggersFormGroup extends React.Component<
  IntentTriggersFormGroupProps,
  IntentTriggersFormGroupState
> {
  constructor(props: IntentTriggersFormGroupProps) {
    super(props);

    this.state = {
      triggers: props.triggers,
    };
  }

  public componentWillReceiveProps(nextProps) {
    this.updateTriggersState(nextProps);
  }

  public render() {
    const triggerItems = this.getTriggerItems();
    return (
      <>
        <FormGroup isSortable={false}>{triggerItems.components}</FormGroup>
        <TriggerAddButtonGroup
          onTextClick={this.getOnAddHandler(TriggerTypeEnum.PLAIN)}
          onKeywordsClick={this.getOnAddHandler(TriggerTypeEnum.COMBINATION)}
        />
      </>
    );
  }

  private getTriggerItems(): TriggerItemsType {
    const { form, dictionaries, formKey } = this.props;
    const { triggers } = this.state;
    const keys = form.getFieldValue(formKey);

    const searchResults = (dictionaries || []).map(dictionary => ({
      key: dictionary.id,
      value: `$${dictionary.name}`,
    }));

    return triggers.reduce<TriggerItemsType>(
      (accumulator, trigger) => {
        const onRemoveHandler = this.getOnRemoveHandler(trigger.id);

        switch (trigger.type) {
          case TriggerTypeEnum.PLAIN:
            accumulator.components.push(
              <FormItem
                key={trigger.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle={"Remove"}
                iconType="message"
              >
                {renderPlainTriggerInput({
                  form,
                  formIndex: "intent_triggers",
                  item: trigger as PlainTrigger,
                  validTags: searchResults.map(i => i.value),
                })}
              </FormItem>,
            );
            break;
          case TriggerTypeEnum.COMBINATION:
            accumulator.components.push(
              <FormItem
                key={trigger.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle={"Remove"}
                iconType="tags-o"
              >
                {renderCombinationTriggerInput({
                  form,
                  formIndex: "intent_triggers",
                  item: trigger as CombinationTrigger,
                  searchResults,
                })}
              </FormItem>,
            );
            break;
        }
        return accumulator;
      },
      { components: [] },
    );
  }

  private getOnAddHandler = (type: TriggerTypeEnum) => () => {
    const { triggers } = this.state;

    this.setState(
      {
        triggers: triggers.concat({
          id: getUniqueNumberForSession(),
          type,
          value: type === TriggerTypeEnum.PLAIN ? [""] : [],
        }),
      },
      this.throwOnTouchToParent,
    );
  };

  private getOnRemoveHandler = (itemId: number) => () => {
    const { triggers } = this.state;

    this.setState(
      {
        triggers: triggers.filter(trigger => trigger.id !== itemId),
      },
      this.throwOnTouchToParent,
    );
  };

  private getTriggersState(form) {
    const values = form.getFieldValue("values");
    const formIndex: IntentFormIndexType = "intent_triggers";
    const formTriggers: { [triggerId: string]: Trigger } = values[formIndex];

    return formTriggers;
  }

  private updateTriggersState(nextProps: IntentTriggersFormGroupProps) {
    const { triggers } = this.state;
    const formTriggers = this.getTriggersState(nextProps.form);

    if (formTriggers) {
      const updatedTriggers: Trigger[] = triggers.reduce<Trigger[]>((accumulator, trigger) => {
        const foundFormTrigger = formTriggers[trigger.id];

        if (foundFormTrigger) {
          accumulator.push(foundFormTrigger);
        }

        return accumulator;
      }, []);

      this.setState({
        triggers: updatedTriggers,
      });
    }
  }

  private throwOnTouchToParent = () => {
    const { onTouch } = this.props;

    if (onTouch) {
      onTouch();
    }
  };
}
