import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'antd';

const EditCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '' }); // Змінено з null на об'єкт із властивістю name
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`http://rozetka.com/api/categories/${categoryId}`);
        if (data && data.name) {
          setCategory({ name: data.name });
          setImageUrl(`http://rozetka.com/upload/150_${data.image}`);
        }
      } catch (error) {
        console.error('Could not fetch category', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e: any) {
        setImageUrl(e.target.result); // Використовуємо Data URL для показу зображення
      };
      reader.readAsDataURL(file);
      setSelectedImage(file); // Зберігаємо файл для надсилання на сервер
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true); // Починаємо завантаження

    const formData = new FormData();
    formData.append('name', category.name);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await axios.post(`http://rozetka.com/api/categories/edit/${categoryId}`, formData);
      setImageUrl(response.data.imageUrl); // Оновлюємо imageUrl до URL з сервера
      message.success('Category updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to update category', error);
      message.error('Failed to update category');
    } finally {
      setLoading(false); // Закінчуємо завантаження
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={category.name}
                onChange={(e: any) => setCategory({ ...category, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {imageUrl && (
                <Image 
                src={imageUrl}
                
                thumbnail 
              />
              )}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Save Changes'}
            </Button>
          </Form>
          {loading && (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditCategoryPage;