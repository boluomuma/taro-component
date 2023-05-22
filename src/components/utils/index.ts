import Taro from '@tarojs/taro'
import { memoize } from "./memoize";
import { _bem } from './bem'

const REGEXP = new RegExp('{|}|"', "g");
export function keys(obj: any) {
  return JSON.stringify(obj)
    .replace(REGEXP, "")
    .split(",")
    .map(function (item) {
      return item.split(":")[0];
    });
}

function kebabCase(word: any) {
  const newWord = word
    .replace(new RegExp("[A-Z]", "g"), function (i: any) {
      return "-" + i;
    })
    ?.toLowerCase();

  return newWord;
}

export function style(styles: any): string {
  if (Array.isArray(styles)) {
    return (
      styles
        .filter(function (item: any) {
          return item != null && item !== "";
        })
        .map(function (item: any) {
          return style(item);
        })
        .join(";") || ""
    );
  }

  if (toString.call(styles) === "[object Object]") {
    return (
      keys(styles)
        .filter(function (key: any) {
          return styles[key] != null && styles[key] !== "";
        })
        .map(function (key: any) {
          return [kebabCase(key), [styles[key]]].join(":");
        })
        .join(";") || ""
    );
  }

  return styles || "";
}
export function range(num: any, min: any, max: any) {
  return Math.min(Math.max(num, min), max);
}
export function isObj(x: any) {
  const type = typeof x;
  return x !== null && (type === "object" || type === "function");
}
export const bem: (name: any, conf?: any) => string = memoize(_bem)

export function addUnit(value: any) {
  if (value == null) {
    return undefined
  }

  return /^-?\d+(\.\d+)?$/.test('' + value) ? Taro.pxTransform(value) : value
}
