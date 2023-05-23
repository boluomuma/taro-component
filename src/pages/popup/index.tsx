import { useState, useMemo } from "react";
import { View } from "@tarojs/components";
import { Popup } from "@/components/popup";
import { Picker } from "@/components/picker";

const columns = new Array(18).fill(1).map((item, index) => ({
  text: `${index}不要了`,
  value: index,
}));
export default function Demo() {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(0);

  const onConfirm = (e) => {
    console.log(e.detail);
    setVal(e.detail.value.value);
    setShow(false);
  };

  const index = useMemo(() => {
    return columns.findIndex((i) => i.value === val);
  }, [val]);

  console.log("index", index, columns);

  return (
    <View>
      <View onClick={() => setShow(true)}>展示弹出层</View>
      <Popup show={show} position='bottom' onClose={() => setShow(false)}>
        <Picker
          defaultIndex={index}
          columns={columns}
          onConfirm={onConfirm}
          onCancel={() => setShow(false)}
        ></Picker>
      </Popup>
    </View>
  );
}
