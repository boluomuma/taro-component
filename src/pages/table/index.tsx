import BTable from "@/components/Table";

export default function Table() {
  const columns = [
    {
      title: "不干了",
      key: "name",
    },
    {
      title: "年级",
      key: "age",
    },
  ];
  const data = [
    { name: "杨兄弟", age: 14 },
    { name: "杨兄弟1", age: 14 },
  ];
  return <BTable columns={columns} data={data}></BTable>;
}
