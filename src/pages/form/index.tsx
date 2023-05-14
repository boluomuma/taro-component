import React, { useRef } from "react";
import { Input } from "@tarojs/components";
// import { WKForm, FormItem } from '@/component/wk-form';
import {
  WKButton,
  WKPickerSelector,
  WKForm,
  WKFormItem,
} from "@wakeapp/components";
import { FormModel } from "@/component/wk-form/model/FormModel";

export default function FormText() {
  const formRef = useRef<FormModel>();
  const submit = (val: any) => {
    console.log("fdsf", val);
  };
  const handleInput = (e) => {
    console.log("e", e);
  };
  return (
    <>
      <WKForm onSubmit={submit} ref={formRef}>
        <WKFormItem label='姓名' path='name' onChangePropsName='onInput' required>
          <Input onInput={handleInput} placeholder='请输入'></Input>
        </WKFormItem>
        <WKFormItem label='城市' path='cityCode' required>
          <WKPickerSelector
            options={[{ label: "中国", value: 1 }]}
          ></WKPickerSelector>
        </WKFormItem>
      </WKForm>
      <WKButton
        onClick={() => formRef.current?.validate()}
        text='提交'
        type='primary'
      />
    </>
  );
}
