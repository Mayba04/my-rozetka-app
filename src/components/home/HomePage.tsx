import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Popconfirm, Button } from 'antd';
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from '../audit/AuthUtils';

interface ICategoryItem {
  id: number;
  name: string;
  image: string; 
}

const HomePage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ICategoryItem[]>([]);
  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      // Якщо користувач не зареєстрований, перенаправте його на сторінку входу
      navigate('/login');
    } else {
      fetchCategories();
    }
  }, [isAuthenticated, navigate]);

  const fetchCategories = () => {
    axios.get<ICategoryItem[]>("http://rozetka.com/api/categories")
      .then((resp) => {
        setList(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://rozetka.com/api/categories/${id}`)
      .then(() => {
        fetchCategories();
      })
      .catch((error) => {
        alert(`There was an error deleting the category: ${error.message}`);
      });
  };

  const goToEditPage = (categoryId: number) => {
    navigate(`/edit-category/${categoryId}`); 
  };
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
      render: (image: string) => (
        <img src={`http://rozetka.com/upload/150_${image}`} alt={"Image"} style={{ width: '50px' }}/>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: ICategoryItem) => (
        <>
          <Button onClick={() => goToEditPage(record.id)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: 8 }} danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
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