import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss'

export default function Index() {
  const list = [
    {
      label: "form表单",
      url: "/pages/form/index",
    },
    {
      label: "表格",
      url: "/pages/table/index",
    },
    {
      label: "弹窗",
      url: "/pages/popup/index",
    },
  ];
  return (
    <View className='container'>
      {list.map((item) => (
        <View
          className='item'
          key={item.url}
          onClick={() =>
            Taro.navigateTo({
              url: item.url,
            })
          }
        >{item.label}</View>
      ))}
    </View>
  );
}
