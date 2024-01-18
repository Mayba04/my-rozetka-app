// ProductDetail.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { name: string; product_id: number }[];
}

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get<Product>(`http://rozetka.com/api/products/${productId}`);
      console.log(data);

      const response = await axios.get<{ photo_names: { name: string; product_id: number }[] }>(`http://rozetka.com/api/productimg/${productId}`);
      console.log(response.data);

      const productWithImages: Product = {
        ...data,
        images: response.data.photo_names || [],
      };

      setProduct(productWithImages);

    } catch (error) {
      console.error('Не вдалося отримати продукт', error);
    }
  };

  useEffect(() => {
    const mockProduct: Product = { id: Number(productId), name: `Product ${productId}`, description: 'Product description', price: 100, images: [] };
    setProduct(mockProduct);
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ width: '100%' }} className="mb-3">
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} style={{ height: '400px' }}>
              {product.images.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`http://rozetka.com/upload/600_${photo.name}`}
                    alt={`Slide ${index}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Description: {product.description}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;