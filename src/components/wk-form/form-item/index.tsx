import React, { FC } from "react";
import { observer } from "mobx-react";
import { View } from "@tarojs/components";
import { Field, WKFieldContext } from "../field";
import { FormItemProps } from "../model";

import "./index.scss";

interface Props extends FormItemProps {
  children?: React.ReactNode;
}

export const FormItem: FC<Props> = observer((props) => {
  const { label, prop, onChangePropsName = "onChange", ...other } = props;

  return (
    <Field label={label} prop={prop} {...other}>
      {(context: WKFieldContext) => {
        return (
          <View className='b-form-item'>
            <View className='b-form-item__label'>{label}</View>
            <View className='b-form-item__content'>
              {React.isValidElement(props.children) &&
                React.cloneElement(props.children as any, {
                  [onChangePropsName]: context.onChange,
                  value: context.value,
                  onFocus: context.onFocus,
                  onBlur: context.onBlur,
                })}
              {!!context.error && (
                <View className='b-form-item__error'>{context.error}</View>
              )}
            </View>
          </View>
        );
      }}
    </Field>
  );
});
