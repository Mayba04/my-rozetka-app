import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from 'antd';


interface ICategoryItem {
  Id: number;
  name: string;
}

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  const mapData = list.map((item) => {
    return <li key={item.Id}>{item.name}</li>;
  });

  useEffect(() => {
    axios
      .get<ICategoryItem[]>("http://rozetka.com/api/categories")
      .then((resp) => {
        //console.log("Resp data", resp.data);
        setList(resp.data);
      });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <>
        <h1>Categories</h1>
        <Table dataSource={list} columns={columns} rowKey="id" />
    </>
  );
};
export default HomePage;
