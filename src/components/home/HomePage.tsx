import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from 'antd';
import { ColumnsType } from "antd/es/table";

interface ICategoryItem {
  id: number;
  name: string;
  image: string; 
}

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    axios
      .get<ICategoryItem[]>("http://rozetka.com/api/categories")
      .then((resp) => {
        console.log("Resp data", resp.data);
        // const dataWithImageUrls = resp.data.map(item => ({
        //   ...item,
        //   imageUrl: `http://rozetka.com/upload/150_${item.image}` 
        // }));
        setList(resp.data);
      });
  }, []);

  const columns: ColumnsType<ICategoryItem> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => { return (
        <img src={`http://rozetka.com/upload/150_${image}`} alt={"Image"}/>)}
    
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
