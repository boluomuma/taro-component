export interface ColumnsItem {
  title: string;
  key: string;
  render?: (row, index) => JSX.Element;
  renderHead?: (row, index) => JSX.Element;
  sort?: boolean | 'custom';
  width?: number | string;
  sortOrders?: string[]; // 自定义排序字段
}
