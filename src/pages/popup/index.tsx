import { useState } from "react"
import { View } from "@tarojs/components"
import {Popup} from '@/components/popup'

export default function Demo() {
  const [show, setShow] = useState(false)
  return (
    <View>
      <View  onClick={() => setShow(true)} >展示弹出层</View>
      <Popup show={show} position='bottom' style={{height: '30%'}} onClose={() => setShow(false)}>
        内容
      </Popup>
    </View>
  )
}