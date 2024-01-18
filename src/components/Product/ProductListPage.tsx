import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Carousel } from 'antd';

interface Product {
  id: number;
  name: string;
  price: number;
  images: { name: string; product_id: number }[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`http://rozetka.com/api/products`);
      console.log(data);
      const uniqueIds = [...new Set(data.map((item: { id: any; }) => item.id))];
      console.error(uniqueIds);
      const { data: imagesData } = await axios.get(`http://rozetka.com/api/productimg?ids[]=${uniqueIds.join('&ids[]=')}`);
      console.log(imagesData);

      // Тепер ми можемо пройтися по кожному продукту і додати фотографії
      const productsWithImages = data.map((product: Product) => ({
        ...product,
        images: imagesData.photo_names[product.id] || []
      }));

      setProducts(productsWithImages);

    } catch (error) {
      console.error('Не вдалося отримати продукт', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <Row gutter={16}>
        {products.map(product => (
          <Col key={product.id} span={8}>
            <Card title={product.name} extra={<Link to={`/products/${product.id}`}>Деталі</Link>}>
              <p>Ціна: {product.price}$</p>
              {/* Виведення фотографій для кожного продукту в каруселі */}
              {product.images.length > 0 && (
                <Carousel>
                  {product.images.map(image => (
                    <div key={image.name}>
                      <img
                        src={`http://rozetka.com/upload/300_${image.name}`}
                        alt={image.name}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
