import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from 'antd';

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
        //console.log("Resp data", resp.data);
        const dataWithImageUrls = resp.data.map(item => ({
          ...item,
          imageUrl: `http://rozetka.com/upload/150_${item.image}` 
        }));
        setList(dataWithImageUrls);
      });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (imageUrl: string) => <img src={imageUrl} alt="" />
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
