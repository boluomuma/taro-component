import { useRef } from "react";
import { Input, Button } from "@tarojs/components";
import { WKForm, FormItem } from "@/components/wk-form";
import { WKPickerSelector } from "@wakeapp/components";
import { FormModel } from "@/components/wk-form/model/FormModel";

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
        <FormItem label='姓名' prop='name' onChangePropsName='onInput' required>
          <Input onInput={handleInput} placeholder='请输入'></Input>
        </FormItem>
        <FormItem label='城市' prop='cityCode' required>
          <WKPickerSelector
            options={[{ label: "中国", value: 1 }]}
          ></WKPickerSelector>
        </FormItem>
      </WKForm>
      <Button onClick={() => formRef.current?.validate()}>提交</Button>
    </>
  );
}
