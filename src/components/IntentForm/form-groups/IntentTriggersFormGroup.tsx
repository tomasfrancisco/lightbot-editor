import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import uuid from "uuid/v4";
import { FormGroup, FormItem } from "~/components/Form";
import {
  renderCombinationTriggerInput,
  renderPlainTriggerInput
} from "~/components/Form/wrappers";
import { FormIndexEnum } from "~/components/IntentForm/FormIndex.enum";
import { TriggerAddButtonGroup } from "~/components/IntentForm/TriggerAddButtonGroup";
import {
  CombinationTrigger,
  Dictionary,
  PlainTrigger,
  Trigger,
  TriggerTypeEnum
} from "~/models";

type TriggerItemsType = {
  components: React.ReactNode[];
};

type IntentTriggersFormGroupProps = FormComponentProps & {
  formKey: string;
  triggers: Trigger[];
  dictionaries: Dictionary[];
  onTouch?(): void;
};

export class IntentTriggersFormGroup extends React.Component<
  IntentTriggersFormGroupProps
> {
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
    const { form, triggers, dictionaries, formKey } = this.props;
    const keys = form.getFieldValue(formKey);

    const searchResults = (dictionaries || []).map(dictionary => ({
      key: dictionary.id,
      value: `$${dictionary.name}`
    }));

    return keys[FormIndexEnum.TRIGGERS].reduce(
      (accumulator, itemKey) => {
        const existingItem = triggers.find(t => t.id === itemKey);

        const item = existingItem || {
          id: itemKey,
          type: itemKey.includes(TriggerTypeEnum.PLAIN)
            ? TriggerTypeEnum.PLAIN
            : TriggerTypeEnum.COMBINATION,
          value: itemKey.includes(TriggerTypeEnum.PLAIN) ? [""] : []
        };

        const onRemoveHandler = this.getOnRemoveHandler(itemKey);

        switch (item.type) {
          case TriggerTypeEnum.PLAIN:
            accumulator.components.push(
              <FormItem
                key={item.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle={"Remove"}
                iconType="message"
              >
                {renderPlainTriggerInput({
                  form,
                  formIndex: FormIndexEnum.TRIGGERS,
                  item: item as PlainTrigger,
                  validTags: searchResults.map(i => i.value)
                })}
              </FormItem>
            );
            break;
          case TriggerTypeEnum.COMBINATION:
            accumulator.components.push(
              <FormItem
                key={item.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle={"Remove"}
                iconType="tags-o"
              >
                {renderCombinationTriggerInput({
                  form,
                  formIndex: FormIndexEnum.TRIGGERS,
                  item: item as CombinationTrigger,
                  searchResults
                })}
              </FormItem>
            );
            break;
        }
        return accumulator;
      },
      { components: [] }
    );
  }

  private getOnAddHandler = (type: TriggerTypeEnum) => () => {
    const { form, formKey, onTouch } = this.props;

    const nextKeys = form.getFieldValue(formKey);
    nextKeys[FormIndexEnum.TRIGGERS].push(`${type}-${uuid()}`);

    form.setFieldsValue({
      [formKey]: nextKeys
    });

    if (onTouch) {
      onTouch();
    }
  };

  private getOnRemoveHandler = k => () => {
    const { form, formKey, onTouch } = this.props;

    const nextKeys = form.getFieldValue(formKey);
    nextKeys[FormIndexEnum.TRIGGERS] = nextKeys[FormIndexEnum.TRIGGERS].filter(
      key => key !== k
    );

    form.setFieldsValue({
      [formKey]: nextKeys
    });

    if (onTouch) {
      onTouch();
    }
  };
}
