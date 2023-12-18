import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('name', categoryName);

    axios.post('http://rozetka.com/api/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);;
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryImage" className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            id="categoryImage"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
