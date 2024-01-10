import { Button, Divider, Form, Input, message, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [file, setFile] = useState<string | null>(null); // Changed type to string for base64
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    if (file == null) {
      message.error("Please select a photo!");
      return;
    }

    const userData = {
      email: values.email,
      name: values.name,
      password: values.password,
      password_confirmation: values.password_confirmation,
      image: file, 
      lastName: values.lastName,
      phone: values.phone,
    };

    try {
      const response = await axios.post("http://rozetka.com/api/register", userData, {
        headers: {
          "Content-Type": "application/json", 
        }
      });

      console.log("Registration Successful:", response.data);
      message.success('Registration Successful!');
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Error creating user!");
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = /^image\/\w+/.test(file.type);
    if (!isImage) {
      message.error('Please select an image file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('The file size should not exceed 10MB!');
    }

    if (isImage && isLt2M) {

      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }

    return false; 
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please enter your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password_confirmation"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[{ required: true, message: 'Please upload your avatar!' }]}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="#"
              beforeUpload={beforeUpload}
            >
              {file ? (
                <img src={file} alt="avatar" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


export default RegisterPage;
