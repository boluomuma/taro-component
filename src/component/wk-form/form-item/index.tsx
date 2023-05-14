import React, { FC, useEffect, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react';
import { View } from '@tarojs/components';
import { useFormContext } from '../context';
import { FormItemModel, FormItemProps } from '../model/FormItemModel';
import { getValueFromEvent } from '../utils';

export const FormItem: FC<FormItemProps> = observer(props => {
  const { label, onChangePropsName = 'onChange' } = props;
  const form = useFormContext();
  if (form == null) {
    throw new Error('表单控件必须放置在表单容器内');
  }
  const field = useMemo(() => {
    return new FormItemModel(form, props);
  }, [form]);

  useEffect(() => {
    field.onMount();
    return field.onUnmount;
  });
  const onChange = useCallback(
    (evt: any) => {
      return field.onChange(getValueFromEvent(evt));
    },
    [field]
  );
  console.log('props.children', props.children, field.value);

  return (
    <View className='form-item'>
      <View className='form-item__label'>{label}</View>
      <View className='form-item__content'>
        {React.isValidElement(props.children) &&
          React.cloneElement(props.children as any, {
            [onChangePropsName]: onChange,
            value: field.value,
            // onFocus: field.onFocus,
            // onBlur: field.onBlur,
          })}
      </View>
    </View>
  );
});
