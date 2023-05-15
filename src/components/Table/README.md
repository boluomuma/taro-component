## API

请使用 markdown 预览此文档

##### Table 属性

| 属性名  | 说明                      | 类型     | 默认值 |
| ------- | ------------------------- | -------- | ------ |
| data    | 显示的数据                | object[] | -      |
| columns | 表格列配置描述,具体见下表 | object[] | -      |
| rowKey  | 表格行 key 的取值         | string   | id     |

##### 事件

| 事件名称 | 说明           | 回调参数                                      |
| -------- | -------------- | --------------------------------------------- |
| onChange | 排序变化时触发 | Function({order:排序值,orderBy:排序列的 key}) |

##### Columns

| 参数       | 说明                                                      | 类型                   | 默认值                        |
| ---------- | --------------------------------------------------------- | ---------------------- | ----------------------------- |
| title      | 列头显示文字                                              | string                 | -                             |
| key        | 列数据在数据项中对应的路径                                | string                 | -                             |
| sort       | 是否启用排序为 true 表示本地排序,设置 custom 为自定义排序 | boolean\|string        | -                             |
| width      | 列宽度                                                    | string\|number         | -                             |
| sortOrders | 自定义排序的字段名                                        | string[]               | ['ascending','descending',''] |
| render     | 生成复杂数据的渲染函数                                    | Function(row,index)    | -                             |
| renderHead | 自定义渲染表头的函数                                      | Function(column,index) | -                             |

```tsx
import { FC } from 'react';
import { observer } from 'mobx-react';
import { View } from '@wakeapp/components';
import Table from '@/components/Table';

export const ActivitySignUpRecordPage: FC = observer(() => {
  const data = [
    {
      name: 'muma',
      phone: 13008856391,
      time: '2023-01-12',
      signUpType: '免费报名',
      status: '成功',
      age: 1,
    },
    {
      name: '杨兄弟',
      phone: 13008856392,
      time: '2023-01-12',
      signUpType: '免费报名',
      status: '成功',
      age: 2,
    },
    {
      name: '杨兄弟',
      phone: 13008856393,
      time: '2023-01-12',
      signUpType: '免费报名',
      status: '成功',
      age: 3,
    },
  ];
  const columns = [
    {
      key: 'name',
      title: '名称',
    },
    {
      key: 'age',
      title: '年纪',
      sort: true,
      sortOrders: ['asce', 'desc', ''],
    },
    {
      key: 'phone',
      title: '手机号',
      sort: true,
    },
    {
      key: 'time',
      title: '报名时间',
    },
    {
      key: 'signUpType',
      title: '报名方式',
    },
    {
      key: 'status',
      title: '状态',
    },
  ];
  return (
    <View>
      <Table data={data} columns={columns}></Table>
    </View>
  );
});
```
