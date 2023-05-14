import { BaseEventOrig } from '@tarojs/components';

/**
 * 从事件 event 中获取变动的值
 * @param evt
 */
export function getValueFromEvent(evt: any) {
  if (evt != null && typeof evt === 'object' && 'detail' in evt) {
    return (evt as BaseEventOrig).detail.value;
  }

  return evt;
}
