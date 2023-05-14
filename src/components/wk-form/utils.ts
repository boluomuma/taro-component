import { BaseEventOrig } from "@tarojs/components";
import { isObservable } from "mobx";
import { cloneDeep } from "lodash";

/**
 * 从事件 event 中获取变动的值
 * @param evt
 */
export function getValueFromEvent(evt: any) {
  if (evt != null && typeof evt === "object" && "detail" in evt) {
    return (evt as BaseEventOrig).detail.value;
  }

  return evt;
}
export function getValidValue(value: any) {
  if (isObservable(value)) {
    return value;
  }

  return cloneDeep(value ?? {});
}
