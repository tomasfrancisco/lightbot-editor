import { mount, shallow } from "enzyme";
import * as React from "react";
import Nestable from "react-nestable";
import { FormGroup, FormItem } from "~/components/Form/components";

const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

describe("components/Form/components/FormGroup", () => {
  describe("data", () => {
    test("throws error when data length is not the same as children length", () => {
      const buildComponent = () => {
        mount(
          <FormGroup isSortable={true} data={[{ id: 1 }]}>
            <FormItem>#1</FormItem>
            <FormItem>#2</FormItem>
            <FormItem>#3</FormItem>
          </FormGroup>
        );
      };

      expect(buildComponent).toThrowError();
    });
  });

  describe("isSortable", () => {
    describe("true", () => {
      let component;

      beforeEach(() => {
        component = mount(
          <FormGroup isSortable={true} data={data}>
            <FormItem>#1</FormItem>
            <FormItem>#2</FormItem>
            <FormItem>#3</FormItem>
          </FormGroup>
        );
      });

      test("renders Nestable component", () => {
        expect(component.find(Nestable)).toHaveLength(1);
      });

      test("renders FormItem component with sortHandler prop", () => {
        expect(
          component
            .find(FormItem)
            .at(1)
            .props()
        ).toHaveProperty("sortHandler");
      });
    });

    describe("false", () => {
      let component;

      beforeEach(() => {
        component = shallow(
          <FormGroup isSortable={false} data={data}>
            <FormItem>#1</FormItem>
            <FormItem>#2</FormItem>
            <FormItem>#3</FormItem>
          </FormGroup>
        );
      });

      test("renders children", () => {
        expect(component).toHaveLength(3);
      });

      test("renders FormItem component with no renderSortHandler prop", () => {
        expect(
          component
            .find(FormItem)
            .at(1)
            .props()
        ).not.toHaveProperty("renderSortHandler");
      });
    });
  });
});
