import {
  FC,
  ForwardedRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Form } from "@tarojs/components";
import { FormContextProvider } from "../context";
import { FormModel, FormProps } from "../model/FormModel";

export const WKForm = forwardRef<FormModel, FormProps>(
  (props, ref: ForwardedRef<FormModel>) => {
    const model = useMemo(() => {
      return new FormModel(props);
    }, []);
    useImperativeHandle(
      ref,
      () => {
        return model;
      },
      [model]
    );

    const handleSubmit = () => {};

    console.log("form", props.children);

    return (
      <FormContextProvider model={model}>
        <Form onSubmit={handleSubmit}>{props.children}</Form>
      </FormContextProvider>
    );
  }
);
